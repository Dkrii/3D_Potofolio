import gsap from 'gsap'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { type ElementRef, useEffect, useRef, useState } from 'react'
import { PerspectiveCamera } from 'three'
import { useCameraDevStore } from '../store/cameraDevStore'
import { usePortfolioStore } from '../store/portfolioStore'

export function CameraController() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const invalidate = useThree((state) => state.invalidate)
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const viewportMode = useCameraDevStore((state) => state.viewportMode)
  const desktopPresets = useCameraDevStore((state) => state.desktopPresets)
  const mobilePresets = useCameraDevStore((state) => state.mobilePresets)
  const editMode = useCameraDevStore((state) => state.editMode)
  const setCurrentView = useCameraDevStore((state) => state.setCurrentView)
  const controls = useRef<ElementRef<typeof OrbitControls>>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const isOverview = activeSection === 'overview'

  const activePresets = viewportMode === 'mobile' ? mobilePresets : desktopPresets

  const viewSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (viewSyncTimerRef.current) clearTimeout(viewSyncTimerRef.current)
  }, [])

  useEffect(() => {
    const orbit = controls.current
    if (!orbit) return
    const preset = activePresets[activeSection]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reducedMotion ? 0 : 1.25
    setIsTransitioning(true)

    const update = () => {
      orbit.update()
      invalidate()
    }
    const complete = () => {
      setIsTransitioning(false)
      update()
    }

    const customEase = 'power3.inOut'

    const aspect = size.width / Math.max(size.height, 1)
    let targetFov = preset.fov
    if (viewportMode === 'desktop') {
      const standardAspect = 1.77
      if (aspect < standardAspect) {
        const radFov = (preset.fov * Math.PI) / 180
        const compensatedRad = 2 * Math.atan(Math.tan(radFov / 2) * (standardAspect / aspect))
        targetFov = Math.min(85, Math.max(preset.fov, (compensatedRad * 180) / Math.PI))
      }
    }

    const positionTween = gsap.to(camera.position, {
      x: preset.position[0],
      y: preset.position[1],
      z: preset.position[2],
      duration,
      ease: customEase,
      onUpdate: update,
      onComplete: complete,
      overwrite: 'auto',
    })
    const targetTween = gsap.to(orbit.target, {
      x: preset.target[0],
      y: preset.target[1],
      z: preset.target[2],
      duration,
      ease: customEase,
      onUpdate: update,
      overwrite: 'auto',
    })
    const fovTween = camera instanceof PerspectiveCamera ? gsap.to(camera, {
      fov: targetFov,
      duration,
      ease: customEase,
      onUpdate: () => {
        camera.updateProjectionMatrix()
        invalidate()
      },
      overwrite: 'auto',
    }) : null

    return () => {
      positionTween.kill()
      targetTween.kill()
      fovTween?.kill()
    }
  }, [activeSection, camera, invalidate, activePresets, viewportMode, size.width, size.height])

  const captureView = () => {
    const orbit = controls.current
    if (!editMode || !orbit || !(camera instanceof PerspectiveCamera) || viewSyncTimerRef.current) return
    viewSyncTimerRef.current = setTimeout(() => {
      viewSyncTimerRef.current = null
      setCurrentView({
        position: [camera.position.x, camera.position.y, camera.position.z],
        target: [orbit.target.x, orbit.target.y, orbit.target.z],
        fov: camera.fov,
      })
    }, 80)
  }

  return (
    <OrbitControls
      ref={controls}
      enabled={(isOverview || editMode) && !isTransitioning}
      onChange={captureView}
      enableRotate
      enableZoom
      enablePan
      enableDamping
      dampingFactor={0.08}
      minDistance={24}
      maxDistance={120}
      minPolarAngle={Math.PI * 0.16}
      maxPolarAngle={Math.PI * 0.47}
      makeDefault
    />
  )
}
