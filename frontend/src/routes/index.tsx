import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const [count, setCount] = useState(0);

	return (
		<div className="p-2">
			<h1>Hello from Home!</h1>
			<br />
			<Button onClick={() => setCount((prev) => prev + 1)}>
				Press Me! {count}
			</Button>
		</div>
	);
}
