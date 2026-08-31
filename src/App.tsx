import { Canvas } from '@react-three/fiber'
import { Suspense, type CSSProperties } from 'react'
import './App.css'
import { Navigation } from './components/navigation/Navigation'
import { PortfolioPanel } from './components/panels/PortfolioPanel'
import { DashboardHeader, StatusBar } from './components/ui/DashboardChrome'
import { CameraDevControls } from './components/ui/CameraDevControls'
import { LoadingOverlay, SceneLoader } from './components/ui/Loading'
import { SceneControls } from './components/ui/SceneControls'
import { Tooltip } from './components/ui/Tooltip'
import { WebGLBoundary } from './components/ui/WebGLBoundary'
import { PortfolioScene } from './scene/PortfolioScene'
import { usePortfolioStore } from './store/portfolioStore'

function App() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const overlay = usePortfolioStore((state) => state.sceneSettings.overlay)

  return (
    <main className="app-shell" style={{ '--scene-overlay': overlay } as CSSProperties}>
      <DashboardHeader />
      <aside className="sidebar"><Navigation /><div className="sidebar-meta"><span>Explore Mode</span><strong>Interactive Model</strong><small>Orbit · Zoom · Select</small></div></aside>
      <section className="scene-workspace" aria-label="Interactive 3D portfolio model">
        <WebGLBoundary>
          <Canvas camera={{ position: [9.5, -15.5, 9.5], fov: 38, near: 0.1, far: 500 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }} frameloop="demand">
            <Suspense fallback={<SceneLoader />}><PortfolioScene /></Suspense>
          </Canvas>
        </WebGLBoundary>
        <div className="viewport-label"><span>Interactive model</span><small>3D PORTFOLIO / EXPLORE</small></div>
        {activeSection === 'overview' && <div className="scene-intro">
          <p className="intro-kicker">Software Engineer · Portfolio</p>
          <h1>Dikri<br /><em>Ali</em></h1>
          <p>Computer vision, building management systems, and web experiences—mapped through an interactive 3D portfolio model.</p>
          <span className="intro-prompt"><i aria-hidden="true" /> Select a model node or use navigation</span>
        </div>}
        <SceneControls />
        {import.meta.env.DEV && <CameraDevControls />}
        <p className="scene-hint"><span>Drag</span> orbit <span>Scroll</span> zoom <span>Right-drag</span> pan</p>
      </section>
      <section id="main-content" className="content-layer"><PortfolioPanel /></section>
      <Tooltip />
      <LoadingOverlay />
      <StatusBar />
    </main>
  )
}

export default App
