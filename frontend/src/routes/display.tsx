import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAllergenMenu } from "@/hooks/useAllergenMenu";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/display")({
	component: RouteComponent,
});

function RouteComponent() {
	const menu = useAllergenMenu();
	const containerRef = useRef<HTMLDivElement>(null);
	const [scrollingDown, setScrollingDown] = useState(true);
	const [paused, setPaused] = useState(false);
	const lastTimeRef = useRef(performance.now());

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let animationFrame: number;
		const scrollSpeed = 0.1; // pixels per ms
		const pauseDuration = 2000; // milliseconds

		const scroll = (time: number) => {
			if (paused) {
				animationFrame = requestAnimationFrame(scroll);
				return;
			}

			const delta = time - lastTimeRef.current;
			lastTimeRef.current = time;

			if (scrollingDown) {
				container.scrollTop += delta * scrollSpeed;
				if (
					container.scrollTop + container.clientHeight >=
					container.scrollHeight
				) {
					setPaused(true);
					setTimeout(() => {
						setScrollingDown(false);
						setPaused(false);
						lastTimeRef.current = performance.now(); // 🧩 ensures smooth speed after pause
					}, pauseDuration);
				}
			} else {
				container.scrollTop -= delta * scrollSpeed;
				if (container.scrollTop <= 0) {
					setPaused(true);
					setTimeout(() => {
						setScrollingDown(true);
						setPaused(false);
						lastTimeRef.current = performance.now(); // 🧩 ensures smooth speed after pause
					}, pauseDuration);
				}
			}

			animationFrame = requestAnimationFrame(scroll);
		};

		animationFrame = requestAnimationFrame(scroll);
		return () => cancelAnimationFrame(animationFrame);
	}, [scrollingDown, paused]);

	return (
		<div
			className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 mb-4 overflow-y-hidden max-h-screen"
			ref={containerRef}
		>
			{menu.map((item, index) => (
				<Card key={index}>
					<CardHeader>
						<CardTitle className="text-center">
							{item.item}
						</CardTitle>
						{item.allergens.length !== 0 && (
							<CardDescription className="flex justify-center gap-4 mt-2">
								{item.allergens.map(
									(al: any, index: number) => (
										<div key={index}>{al}</div>
									)
								)}
							</CardDescription>
						)}
					</CardHeader>
					<CardContent className="flex grow">
						<img
							src={item.image_url ?? "/PFU.jpg"}
							className="aspect-square object-contain"
						/>
					</CardContent>
					<CardFooter className="flex justify-center">
						${item.price.toFixed(2)}
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
