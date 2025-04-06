import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { ok } from "@/lib/fetchUtils";
import { ItemWidget } from "@/components/ItemWidget";
import ReactDOM from "react-dom/client";
// import { set } from "react-hook-form";

interface MenuItem {
	item: string;
	price: number;
	description: string;
	image_url: string;
	ingredients: string[];
}

let items: MenuItem[] = [];
let full_menu: MenuItem[] = [];
let subtotal: number = 0.00;


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
			full_menu = await getMenu();
			setButtons(full_menu.map((item) => item.item));
			console.log("Menu fetched:", full_menu);
		}
		fetchMenu();
	}, []);

	function updateCheckoutMenu(item: MenuItem) {
		const subtotalLabel = document.getElementById("subtotal-label");
		const checkoutItems = document.getElementById("checkout-items");
		if (subtotalLabel) {
			// subtotalLabel.innerHTML = `Total: $${(subtotal * 1.0825).toFixed(2)}`;
		}
		if (checkoutItems) {
			// checkoutItems.innerHTML = ""; 
			const itemDiv = document.createElement("div");
			itemDiv.className = "text-white";
			const root = ReactDOM.createRoot(itemDiv);
			root.render(<ItemWidget item={item} />);
			checkoutItems.appendChild(itemDiv);
		}
	}

	return (		
		<div className="flex gap-8">
			<div
				className="grid grid-cols-4 gap-6"
				style={{
					width: "70%",
				}}
			>
			{buttons.map((label, index) => (
				<Button
					key={index}
					className="col-span-1 hover:bg-[url({full_menu[index].image_url})]"
					onClick={() => {
						// console.log("Just making sure this exists!", full_menu);
						const item = full_menu.find((item) => item.item === label);
						// console.log("Item found:", item);
						if (item) {
							if(!items.find((i) => i.item === item.item)) {
								items.push(item); 
								subtotal += item.price;
								// console.log("Subtotal:", subtotal);
								updateCheckoutMenu(item);
							}
						} else {
							console.error(`Item with label "${label}" not found in the menu.`);
						}
					}}
					onMouseOver={(event) => {
						const button = event.currentTarget as HTMLButtonElement;
						if (button) {
							// button.style.backgroundColor = "#f7a663";
							button.style.backgroundImage = `url(${full_menu[index].image_url})`;
							button.style.backgroundSize = "cover";
							button.style.backgroundPosition = "center";
							button.style.transition = "background-image 0.3s ease";
							button.style.color = "rgba(0, 0, 0, 0)";
						}
						// console.log("Hovering over button:", label);
					}}
					onMouseOut={(event) => {
						const button = event.currentTarget as HTMLButtonElement;
						if (button) {
							// button.style.backgroundColor = "#f0f0f0";
							button.style.backgroundImage = "none";
							button.style.transition = "background-image 0.3s ease";
							button.style.color = "black";
						}
					}}
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
					overflowY: "auto"
				}}
			>
				{/* <Label
					className="text-white text-2xl font-bold"
					id="subtotal-label"
					style={{
						textAlign: "center",
						marginTop: "10px",
						marginLeft: "10px"
					}}>
					Total: ${0.00.toFixed(2)}
				</Label> */}
				<div 
					className="flex flex-col gap-8" 
					id="checkout-items"
					style={{
						marginTop: "20px",
						marginLeft: "15%"
					}}
				>
				</div>

			</div>
		</div>
		
	);
}
