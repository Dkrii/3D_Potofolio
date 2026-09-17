import { usePortfolioStore } from '../store/portfolioStore'

export function Environment() {
  const settings = usePortfolioStore((state) => state.sceneSettings)
  const exposure = settings.exposure

  return (
    <>
      <color attach="background" args={[settings.background]} />
      <ambientLight intensity={settings.ambient * exposure} />
      <hemisphereLight args={['#ffffff', '#8690a0', settings.hemisphere * exposure]} />
      <directionalLight color="#ffffff" intensity={settings.keyLight * exposure} position={[-30, 45, -35]} />
      <directionalLight color="#dcecff" intensity={settings.fillLight * exposure * 1.2} position={[35, 25, 30]} />
    </>
  )
}
