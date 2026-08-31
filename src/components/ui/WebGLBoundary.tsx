import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { failed: boolean }

export class WebGLBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('3D scene unavailable', error, info)
  }

  render() {
    if (this.state.failed) return <div className="webgl-fallback"><strong>3D view unavailable</strong><span>Use navigation to explore portfolio content.</span></div>
    return this.props.children
  }
}
