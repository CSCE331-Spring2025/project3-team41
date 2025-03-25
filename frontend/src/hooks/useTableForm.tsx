import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColumnDef, Row } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodString } from "zod";
import { UpdateEntry } from "@/components/EditTable";

// goddamn cursed ass file
// straight from the deepest pits of typescript hell
function useTableForm<TData, TValue>(
	columns: ColumnDef<TData, TValue>[],
	data: TData[],
	defaultValues: {
		row?: Row<TData>;
		defaultConstructed?: TData;
	},
	primaryKey: keyof TData,
	onSubmit: UpdateEntry<TData>,
	validation: "CREATE" | "UPDATE"
) {
	if (
		defaultValues.row === undefined &&
		defaultValues.defaultConstructed === undefined
	) {
		throw new Error(
			"Either a row or default constructed value must be provided."
		);
	}

	const originalPrimaryKey = defaultValues.row
		? defaultValues.row.getValue(primaryKey as string)
		: defaultValues.defaultConstructed![primaryKey];

	function uniquePrimaryKey(id: string | number): boolean {
		if (id === originalPrimaryKey && validation !== "CREATE") {
			return true;
		}

		for (let i = 0; i < data.length; i++) {
			if (data[i][primaryKey] === id) {
				console.log(`Similar: ${JSON.stringify(data[i])}`);
				return false;
			}
		}

		return true;
	}

	const { names, defaults, formSchema } = getColumns(
		columns,
		data,
		defaultValues,
		primaryKey,
		uniquePrimaryKey
	);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaults,
	});

	function _onSubmit(values: z.infer<typeof formSchema>) {
		onSubmit(defaults as TData, values as TData);
	}

	// TODO - make for scrollable
	function renderForm() {
		return (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(_onSubmit)}
					className="space-y-8"
				>
					{Object.entries(names).map(([id, name], index) => (
						<FormField
							key={`${name}-${index}`}
							control={form.control}
							name={id as never}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{name}</FormLabel>
									<FormControl>
										<Input
											placeholder={name}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		);
	}

	return { renderForm };
}

function getColumns<TData, TValue>(
	columns: ColumnDef<TData, TValue>[],
	data: TData[],
	defaultValues: {
		row?: Row<TData>;
		defaultConstructed?: TData;
	},
	primaryKey: keyof TData,
	uniquePrimaryKey: (id: string | number) => boolean
) {
	let names: Record<string, string> = {};
	let defaults: Record<string, string | number> = {};
	let formSchema = z.object({});

	for (const col of columns) {
		const id = (col as typeof col & { accessorKey: string }).accessorKey;
		const name = id
			.split("_")
			.map((s) => s.substring(0, 1).toLocaleUpperCase() + s.substring(1))
			.join(" ");
		const type = typeof data[0][id as keyof TData];
		const value = defaultValues.row
			? (defaultValues.row.getValue(id) as string)
			: (defaultValues.defaultConstructed![id as keyof TData] as string);
		let zodType:
			| z.ZodString
			| z.ZodNumber
			| z.ZodEffects<ZodString, string, string> =
			type === "string"
				? z.string().nonempty()
				: z.coerce.number().min(0);

		if (id === primaryKey) {
			zodType = (zodType as ZodString).refine(
				uniquePrimaryKey,
				"This Primary Key conflicts with another item in the database."
			);
		}

		names[id] = name;
		defaults[id] = type === "string" ? value : parseFloat(value);
		formSchema = formSchema.extend({ [id]: zodType });
	}

	return { names, defaults, formSchema };
}

export default useTableForm;
