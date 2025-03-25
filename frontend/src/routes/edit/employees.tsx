import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/EditTable";
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";

export const Route = createFileRoute("/edit/employees")({
	component: RouteComponent,
});

interface Employee {
	employee_id: number;
	hours_worked: number;
	manager_id: number;
	name: string;
	password: string;
	wage: number;
}

const columns: ColumnDef<Employee>[] = [
	{
		accessorKey: "employee_id",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Employee ID"
			/>
		),
	},
	{
		accessorKey: "manager_id",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Manager ID"
			/>
		),
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Name"
			/>
		),
	},
	{
		accessorKey: "password",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Password"
			/>
		),
	},
	{
		accessorKey: "hours_worked",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Hours Worked"
			/>
		),
		cell: ({ row }) => {
			const amount = parseInt(row.getValue("hours_worked"));
			return <div>{amount.toLocaleString()}</div>;
		},
	},
	{
		accessorKey: "wage",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Wage"
			/>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("wage"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
];

let data: Employee[] = [
	{
		employee_id: 0,
		name: "May",
		hours_worked: 100,
		wage: 12,
		manager_id: 0,
		password: "password",
	},
	{
		employee_id: 1,
		name: "Lilly",
		hours_worked: 10,
		wage: 9,
		manager_id: 0,
		password: "password",
	},
	{
		employee_id: 2,
		name: "Shri",
		hours_worked: 0,
		wage: 11.25,
		manager_id: 0,
		password: "password",
	},
	{
		employee_id: 3,
		name: "Evan",
		hours_worked: 1000,
		wage: 10,
		manager_id: 1,
		password: "password",
	},
	{
		employee_id: 4,
		name: "Owen",
		hours_worked: 20,
		wage: 9.01,
		manager_id: 1,
		password: "password",
	},
];

function RouteComponent() {
	useEffect(() => {
		async function get() {
			const res = await fetch("http://localhost:3000/employees");
			const json = await res.json();
			console.log(JSON.stringify(json));
		}

		// get();
	}, []);

	return (
		<div className="px-4 flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Edit Employees</h1>
			<DataTable
				columns={columns}
				data={data}
				primaryKey={"employee_id"}
				defaultConstructed={{
					employee_id: 0,
					hours_worked: 0,
					manager_id: 0,
					name: "Name",
					password: "Password",
					wage: 0,
				}}
				onCreate={(employee) => {
					console.log(`Create employee ${JSON.stringify(employee)}`);
				}}
				onUpdate={(from, to) =>
					console.log(
						`Update employee ${JSON.stringify(from)} to ${JSON.stringify(to)}`
					)
				}
				onDelete={(employee) =>
					console.log(`Delete employee ${JSON.stringify(employee)}`)
				}
			/>
		</div>
	);
}
