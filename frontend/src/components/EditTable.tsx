import {
	ColumnDef,
	Table as TableType,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { DataTablePagination } from "./DataTablePagination";
import { EditTableCreate, EditTableUpdateDelete } from "./EditTableOptions";

export type CreateEntry<TData> = (entry: TData) => void;
export type UpdateEntry<TData> = (from: TData, to: TData) => void;
export type DeleteEntry<TData> = (entry: TData) => void;

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	primaryKey: keyof TData;
	defaultConstructed: TData;
	onCreate: CreateEntry<TData>;
	onUpdate: UpdateEntry<TData>;
	onDelete: DeleteEntry<TData>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	defaultConstructed,
	primaryKey,
	onCreate,
	onUpdate,
	onDelete,
}: DataTableProps<TData, TValue>) {
	const cols = columns.concat({
		id: "actions",
		header: () =>
			EditTableCreate(
				columns,
				data,
				defaultConstructed,
				primaryKey,
				onCreate
			),
		cell: ({ row }) =>
			EditTableUpdateDelete(
				columns,
				data,
				row,
				primaryKey,
				onUpdate,
				onDelete
			),
	});

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);

	const table = useReactTable({
		data,
		columns: cols,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnVisibility,
		},
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center">
				<DataTableViewOptions table={table} />
			</div>
			<div className="rounded-md border">
				{TableContent(table, columns)}
			</div>
			<DataTablePagination table={table} />
		</div>
	);
}

function TableContent<TData, TValue>(
	table: TableType<TData>,
	columns: ColumnDef<TData, TValue>[]
) {
	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={columns.length}
							className="h-24 text-center"
						>
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
