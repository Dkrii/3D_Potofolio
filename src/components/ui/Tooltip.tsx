import { interactiveMappings } from '../../data/interactiveMappings'
import { usePortfolioStore } from '../../store/portfolioStore'

export function Tooltip() {
  const hoveredObject = usePortfolioStore((state) => state.hoveredObject)
  const mapping = interactiveMappings.find((item) => item.section === hoveredObject)
  if (!mapping) return null
  return (
    <div className="node-label" role="status">
      <span className="node-label-id">NODE / {mapping.nodeLabel}</span>
      <strong>{mapping.label}</strong>
      <small><i />STATUS: {mapping.status}</small>
    </div>
  )
}
