import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import React, { useState } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { CreateEntry, DeleteEntry, UpdateEntry } from "./EditTable";
import useTableForm from "@/hooks/useTableForm";

// TODO - make dialog have a scroll (it's too long)
export function EditTableCreate<TData, TValue>(
	columns: ColumnDef<TData, TValue>[],
	data: TData[],
	defaultConstructed: TData,
	primaryKey: keyof TData,
	onCreate: CreateEntry<TData>
) {
	const [open, setOpen] = useState(false);
	const { renderForm } = useTableForm(
		columns,
		data,
		{ defaultConstructed },
		primaryKey,
		(_, to) => {
			onCreate(to);
			setOpen(false);
		},
		"CREATE"
	);

	// TODO - update table to reflect database
	// TODO - have the primary key and prevent making a new item with same data

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="h-8 data-[state=open]:bg-accent"
				>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Entry</DialogTitle>
					<DialogDescription>
						Create a new entry in the database.
					</DialogDescription>
				</DialogHeader>
				{renderForm()}
			</DialogContent>
		</Dialog>
	);
}

export function EditTableUpdateDelete<TData, TValue>(
	columns: ColumnDef<TData, TValue>[],
	data: TData[],
	row: Row<TData>,
	primaryKey: keyof TData,
	onUpdate: UpdateEntry<TData>,
	onDelete: DeleteEntry<TData>
) {
	const [formType, setFormType] = useState<"UPDATE" | "DELETE">("DELETE");
	const [open, setOpen] = useState(false);
	const { renderForm } = useTableForm(
		columns,
		data,
		{ row },
		primaryKey,
		(from, to) => {
			onUpdate(from, to);
			setOpen(false);
		},
		"UPDATE"
	);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="h-8 w-8 p-0"
					>
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={() => setFormType("UPDATE")}>
							Edit Entry
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={() => setFormType("DELETE")}>
							Delete Entry
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				{formType === "UPDATE" ? (
					<>
						<DialogHeader>
							<DialogTitle>Update Entry</DialogTitle>
							<DialogDescription>
								Update the values of an entry in the database.
							</DialogDescription>
						</DialogHeader>
						{renderForm()}
					</>
				) : (
					EditTableDelete(data, onDelete, row, setOpen)
				)}
			</DialogContent>
		</Dialog>
	);
}

function EditTableDelete<TData>(
	data: TData[],
	onDelete: DeleteEntry<TData>,
	row: Row<TData>,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
	function onSubmit() {
		onDelete(data[parseInt(row.id)]);
		setOpen(false);
		// TODO - remove entry from table to reflect database
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Entry</DialogTitle>
				<DialogDescription>
					This action cannot be undone. Are you sure you want to
					permanently delete this entry from the database?
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button
					type="submit"
					onClick={onSubmit}
				>
					Confirm
				</Button>
			</DialogFooter>
		</>
	);
}
