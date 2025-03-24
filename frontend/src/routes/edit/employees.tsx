import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/employees')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/employees"!</div>
}
