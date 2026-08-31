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
      <directionalLight color="#dcecff" intensity={settings.fillLight * exposure} position={[35, 25, 30]} />
      <directionalLight color="#ffffff" intensity={settings.fillLight * exposure * 0.65} position={[-25, 15, 35]} />
      <directionalLight color="#d7e4ff" intensity={settings.fillLight * exposure * 0.55} position={[30, 12, -30]} />
    </>
  )
}
