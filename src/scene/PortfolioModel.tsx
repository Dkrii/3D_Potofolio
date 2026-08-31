import gsap from 'gsap'
import { Html, useGLTF } from '@react-three/drei'
import { useThree, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Box3, Color, Mesh, MeshStandardMaterial, Object3D, Vector3 } from 'three'
import { interactiveMappings, type InteractiveMapping } from '../data/interactiveMappings'
import { usePortfolioStore, type PortfolioSection } from '../store/portfolioStore'

const modelUrl = '/models/PORTOFOLIO_V2.glb'
const mappingByNode = new Map(interactiveMappings.flatMap((mapping) => mapping.nodes.map((node) => [node, mapping])))

function findMapping(object: Object3D): InteractiveMapping | null {
  let current: Object3D | null = object
  while (current) {
    const mapping = mappingByNode.get(current.name)
    if (mapping) return mapping
    current = current.parent
  }
  return null
}

export function PortfolioModel() {
  const gltf = useGLTF(modelUrl)
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene])
  const invalidate = useThree((state) => state.invalidate)
  const hotspots = useMemo(() => {
    scene.updateMatrixWorld(true)
    const bounds = new Map<Exclude<PortfolioSection, 'overview'>, Box3>()
    scene.traverse((object) => {
      if (!(object instanceof Mesh)) return
      const mapping = findMapping(object)
      if (!mapping) return
      const sectionBounds = bounds.get(mapping.section) ?? new Box3()
      sectionBounds.expandByObject(object)
      bounds.set(mapping.section, sectionBounds)
    })
    return [...bounds].map(([section, box]) => {
      const position = box.getCenter(new Vector3())
      position.y = box.max.y + 0.25
      return { section, position, label: section === 'bms' ? 'BMS' : interactiveMappings.find((mapping) => mapping.section === section)?.label ?? section }
    })
  }, [scene])
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const activeBmsPart = usePortfolioStore((state) => state.activeBmsPart)
  const bmsFloorGap = usePortfolioStore((state) => state.sceneSettings.bmsFloorGap)
  const hotspotOffsets = usePortfolioStore((state) => state.sceneSettings.hotspotOffsets)
  const openSection = usePortfolioStore((state) => state.openSection)
  const setBmsPart = usePortfolioStore((state) => state.setBmsPart)
  const setHoveredObject = usePortfolioStore((state) => state.setHoveredObject)
  const setSceneReady = usePortfolioStore((state) => state.setSceneReady)
  const meshesBySection = useRef(new Map<PortfolioSection, Mesh[]>())
  const bmsObjects = useRef(new Map<number, { object: Object3D; initial: Vector3 }[]>())
  const highlightedSection = useRef<PortfolioSection | null>(null)

  useEffect(() => {
    const sections = new Map<PortfolioSection, Mesh[]>()
    const objects = bmsObjects.current
    scene.traverse((object) => {
      if (!(object instanceof Mesh)) return
      object.castShadow = false
      object.receiveShadow = true
      const mapping = findMapping(object)
      const section = mapping?.section
      if (!section) return
      if (mapping.bmsPart) {
        objects.set(mapping.bmsPart, [...(objects.get(mapping.bmsPart) ?? []), { object, initial: object.position.clone() }])
      }
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      const copies = materials.map((material) => material.clone())
      object.material = Array.isArray(object.material) ? copies : copies[0]
      sections.set(section, [...(sections.get(section) ?? []), object])
    })
    meshesBySection.current = sections
    setSceneReady(true)
    return () => {
      objects.clear()
      setSceneReady(false)
    }
  }, [scene, setSceneReady])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const expanded = activeSection === 'bms' && activeBmsPart !== null
    scene.updateMatrixWorld(true)
    const tweens = [...bmsObjects.current.entries()].flatMap(([part, entries]) => entries.map((entry) => {
      const parent = entry.object.parent
      const localOffset = new Vector3()
      if (expanded && activeBmsPart === part && parent) {
        const worldOrigin = parent.localToWorld(entry.initial.clone())
        const worldTarget = worldOrigin.clone().add(new Vector3(0, bmsFloorGap, 0))
        localOffset.copy(parent.worldToLocal(worldTarget)).sub(entry.initial)
      }
      return gsap.to(entry.object.position, {
        x: entry.initial.x + localOffset.x,
        y: entry.initial.y + localOffset.y,
        z: entry.initial.z + localOffset.z,
        duration: reducedMotion ? 0 : 0.9,
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: invalidate,
        onComplete: invalidate,
      })
    }))
    return () => tweens.forEach((tween) => tween.kill())
  }, [activeBmsPart, activeSection, bmsFloorGap, invalidate, scene])

  const highlight = (section: PortfolioSection | null) => {
    if (highlightedSection.current === section) return
    for (const [mappedSection, meshes] of meshesBySection.current) {
      const active = section !== null && mappedSection === section
      meshes.forEach((object) => {
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => {
          if (material instanceof MeshStandardMaterial) {
            material.emissive.set(active ? new Color('#245070') : new Color('#000000'))
            material.emissiveIntensity = active ? 0.32 : 0
          }
        })
      })
    }
    highlightedSection.current = section
    invalidate()
  }

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    const mapping = findMapping(event.object)
    if (!mapping) return
    event.stopPropagation()
    document.body.style.cursor = 'pointer'
    if (highlightedSection.current === mapping.section) return
    setHoveredObject(mapping.section)
    highlight(mapping.section)
  }

  const onPointerOut = () => {
    document.body.style.cursor = 'default'
    setHoveredObject(null)
    highlight(null)
  }

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    const mapping = findMapping(event.object)
    if (!mapping) return
    event.stopPropagation()
    if (mapping.bmsPart) setBmsPart(mapping.bmsPart)
    else openSection(mapping.section)
  }

  useEffect(() => () => { document.body.style.cursor = 'default' }, [])

  return (
    <>
      <primitive object={scene} onPointerMove={onPointerMove} onPointerOut={onPointerOut} onClick={onClick} />
      {activeSection === 'overview' && hotspots.map((hotspot) => (
        <Html key={hotspot.section} position={hotspot.position.clone().add(hotspotOffsets[hotspot.section])} center occlude zIndexRange={[10, 0]}>
          <button className="object-hotspot" type="button" onClick={() => openSection(hotspot.section)} aria-label={`Open ${hotspot.label}`}>
            <i aria-hidden="true" />
            <span>{hotspot.label}</span>
          </button>
        </Html>
      ))}
    </>
  )
}

useGLTF.preload(modelUrl)
