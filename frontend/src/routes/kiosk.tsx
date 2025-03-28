import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/kiosk")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Button>
			<Link to="/">Exit</Link>
		</Button>
	);
}
