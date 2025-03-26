import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/DataTable/DataTable";
import { Definition } from "@/components/DataTable/DataTableTypes";
import { z } from "zod";

export const Route = createFileRoute("/edit/menu")({
	component: RouteComponent,
});

interface MenuItem {
	item: string;
	price: number;
	description: string;
	ingredients: string[];
}

const definition: Definition<MenuItem>[] = [
	{
		primaryKey: true,
		accessorKey: "item",
		header: "Item",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "price",
		header: "Price",
		sortable: true,
		cell: (row) => {
			const amount = parseFloat(row.getValue("price"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div>{formatted}</div>;
		},
		type: z.number().min(0),
	},
	{
		accessorKey: "description",
		header: "Description",
		sortable: true,
		type: z.string().nonempty(),
	},
	{
		accessorKey: "ingredients",
		header: "Ingredients",
		sortable: true,
		cell: (row) => {
			const ingredients = row.getValue("ingredients") as string[];
			return <div>{ingredients.join(", ")}</div>;
		},
		type: z.array(z.string()).nonempty(),
	},
];

const prefetched = {
	menu: [
		{
			item: "Brown-Sugar Milk Tea",
			price: 2.6,
			description: "Rich brown sugar milk tea",
			ingredients: [
				"Milk",
				"Black Tea",
				"Brown Sugar",
				"Creamer",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Mango Green Milk Tea",
			price: 2.6,
			description: "Refreshing mango green milk tea",
			ingredients: [
				"Milk",
				"Green Tea",
				"Mango",
				"Creamer",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Coffee Milk Tea",
			price: 2.55,
			description: "Rich coffee milk tea",
			ingredients: [
				"Milk",
				"Black Tea",
				"Coffee",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Honey Lemonade",
			price: 3,
			description: "Refreshing lemonade with a hint of honey",
			ingredients: [
				"Lemonade",
				"Honey",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Strawberry Tea",
			price: 3,
			description: "Sweet strawberry-flavored tea",
			ingredients: [
				"Strawberry",
				"Black Tea",
				"Honey",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Tropical Fruit Tea",
			price: 3,
			description: "Exotic tropical fruit tea blend",
			ingredients: [
				"Passion Fruit",
				"Orange",
				"Black Tea",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Mango and Passion Fruit Tea",
			price: 3.1,
			description: "Refreshing mango and passion fruit tea",
			ingredients: [
				"Mango",
				"Passion Fruit",
				"Black Tea",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Milk Tea Ice Blended Tea",
			price: 2.75,
			description: "Chilled ice-blended tea with a fruity twist",
			ingredients: [
				"Milk",
				"Black Tea",
				"Sugar",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Peach Tea Ice Blended",
			price: 2.85,
			description: "Chilled ice-blended peach tea for a refreshing treat",
			ingredients: [
				"Peach",
				"Black Tea",
				"Sugar",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Strawberry Ice Blended Tea",
			price: 2.85,
			description:
				"Chilled ice-blended strawberry tea for smooth refreshment",
			ingredients: [
				"Strawberry",
				"Black Tea",
				"Sugar",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Mango Ice Blended Tea",
			price: 2.85,
			description: "Chilled ice-blended mango tea for a tropical treat",
			ingredients: [
				"Mango",
				"Black Tea",
				"Sugar",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Lime Mojito",
			price: 3.5,
			description: "Refreshing lime mojito with mint",
			ingredients: [
				"Green Tea",
				"Lime",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Strawberry Mojito",
			price: 3.5,
			description: "Refreshing strawberry mojito with mint",
			ingredients: [
				"Green Tea",
				"Strawberry",
				"Lime",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Mango Mojito",
			price: 3.5,
			description: "Refreshing mango mojito with mint",
			ingredients: [
				"Green Tea",
				"Mango",
				"Lime",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Peach Mojito",
			price: 3.5,
			description: "Refreshing peach mojito with mint",
			ingredients: [
				"Green Tea",
				"Peach",
				"Lime",
				"Mint",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Tapioca Pearls",
			price: 0.5,
			description: "Add extra tapioca pearls to your drink",
			ingredients: ["Pearl"],
		},
		{
			item: "Mini Tapioca Pearls",
			price: 0.45,
			description: "Add extra mini tapioca pearls to your drink",
			ingredients: ["Mini Pearl"],
		},
		{
			item: "Crystal Boba",
			price: 0.5,
			description: "Add extra crystal boba to your drink",
			ingredients: ["Crystal Boba"],
		},
		{
			item: "Lychee Jelly",
			price: 0.55,
			description: "Add extra lychee jelly to your drink",
			ingredients: ["Lychee Jelly"],
		},
		{
			item: "Pudding",
			price: 0.55,
			description: "Add extra pudding to your drink",
			ingredients: ["Pudding"],
		},
		{
			item: "Ice Cream",
			price: 0.6,
			description: "Add extra ice cream to your drink",
			ingredients: ["Ice Cream"],
		},
		{
			item: "Creama",
			price: 0.55,
			description: "Add extra cream to your drink",
			ingredients: ["Creama"],
		},
		{
			item: "Classic Tea",
			price: 2.1,
			description: "Refreshing classic tea",
			ingredients: [
				"Black Tea",
				"Sugar",
				"Cup",
				"Cap",
				"Straw",
				"Napkin",
			],
		},
		{
			item: "Sprinkles",
			price: 0.3,
			description: "Add extra sprinkles to your drink",
			ingredients: ["Sprinkles"],
		},
		{
			item: "Orange Chicken\t",
			price: 2,
			description: "Yummy",
			ingredients: ["Napkin"],
		},
		{
			item: "New Item",
			price: 0,
			description: "Empty Description",
			ingredients: [],
		},
	],
};

function RouteComponent() {
	const { status, data, error } = useQuery({
		queryKey: ["employees"],
		queryFn: get,
	});

	async function get() {
		const res = await fetch("http://localhost:3000/menu");
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}
		return res.json();
	}

	if (status === "pending") {
		return <h1>Loading...</h1>;
	}

	if (status === "error") {
		return <h1>There was an error when loading the data.</h1>;
	}

	return (
		<div className="px-4 flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Edit Menu</h1>
			<DataTable<MenuItem>
				definition={definition}
				data={prefetched["menu"]}
				defaultValues={{
					item: "",
					price: 0,
					description: "",
					ingredients: [],
				}}
				onCreate={(menuItem) => {
					console.log(`Create menu item ${JSON.stringify(menuItem)}`);
				}}
				onUpdate={(from, to) =>
					console.log(
						`Update menu item ${JSON.stringify(from)} to ${JSON.stringify(to)}`
					)
				}
				onDelete={(menuItem) =>
					console.log(`Delete menu item ${JSON.stringify(menuItem)}`)
				}
			/>
		</div>
	);
}
