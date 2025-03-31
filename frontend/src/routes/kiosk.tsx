import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { ok } from "@/lib/fetchUtils";

interface MenuItem {
	item: string;
	price: number;
	description: string;
	ingredients: string[];
}
const items: MenuItem[] = [];


export const Route = createFileRoute("/kiosk")({
	component: RouteComponent,
});

function RouteComponent() {
	async function getMenu() : Promise<MenuItem[]> {
		const res = await ok(
			fetch(`${API_URL}/edit/menu`, {
				method: "GET",
			})
		);
		return res.json();
	}
	// console.log("Fetching menu...");
	const [buttons, setButtons] = useState<string[]>([]);

	useEffect(() => {
		async function fetchMenu() {
			const full_menu = await getMenu();
			setButtons(full_menu.map((item: MenuItem) => item.item));
		}
		fetchMenu();
	}, []);

	return (
		// <Button style={{width : "10px", height : "10px"}}>
		// 	<Link to="/">Exit</Link>
		// </Button>
		//create a grid of buttons that is similar to a kiosk
		// with a button for each item in the menu
		
		<div className="flex gap-8">
			<div
				className="grid grid-cols-4 gap-6"
				style={{
					width: "70%"
				}}
			>
							{buttons.map((label, index) => (
				<Button
					key={index}
					className="col-span-1"
					onClick={() => {items.push(label); console.log(items)}}
					style={{
						width: "100%",
						height: "100px",
						backgroundColor: "#f0f0f0",
						borderRadius: "15px",
						fontSize: "13px",
						fontWeight: "bold",
					}}
				>
					{label}
				</Button>
			))}
			</div>
			<div
				className="flex flex-col gap-4"
				style={{
					width: "30%",
					height: "95%",
					backgroundColor: "#27272a",
					borderRadius: "15px",
					fontSize: "13px",
					fontWeight: "bold",
				}}
			>
				<Label
					className="text-white text-2xl font-bold"
					style={{
						textAlign: "center",
						marginTop: "10px",
						marginLeft: "10px"
					}}>
					Subtotal: {0}
				</Label>
			</div>
		</div>
		
	);
}
