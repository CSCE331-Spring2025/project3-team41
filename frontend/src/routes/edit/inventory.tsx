import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/inventory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/inventory"!</div>
}
