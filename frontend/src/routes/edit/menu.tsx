import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/menu"!</div>
}
