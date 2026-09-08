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

    // Ultra-smooth custom cubic-bezier ease for cinema camera feel
    const customEase = 'power3.inOut'

    // Responsive aspect ratio compensation:
    // If aspect ratio < 1.15 (Tablet Portrait / iPad Pro / Square Viewport),
    // proportionally expand FOV so 3D Room isn't cut off on the sides.
    const aspect = size.width / Math.max(size.height, 1)
    let targetFov = preset.fov
    if (viewportMode === 'desktop' && aspect < 1.15) {
      const fovMultiplier = Math.min(1.4, Math.max(1.0, 1.15 / aspect))
      targetFov = Math.round(preset.fov * fovMultiplier)
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
  }, [activeSection, camera, invalidate, activePresets, size.width, size.height, viewportMode])

  const captureView = () => {
    const orbit = controls.current
    if (!orbit || !(camera instanceof PerspectiveCamera)) return
    setCurrentView({
      position: [camera.position.x, camera.position.y, camera.position.z],
      target: [orbit.target.x, orbit.target.y, orbit.target.z],
      fov: camera.fov,
    })
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
