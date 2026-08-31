import { CameraController } from './CameraController'
import { Environment } from './Environment'
import { PortfolioModel } from './PortfolioModel'

export function PortfolioScene() {
  return (
    <>
      <CameraController />
      <Environment />
      <PortfolioModel />
    </>
  )
}
