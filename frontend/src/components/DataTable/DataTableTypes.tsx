// all the types necessary for the data table to be type safe

import { Row } from "@tanstack/react-table";
import { JSX } from "react";
import { UseFormReturn } from "react-hook-form";
import { z, ZodTypeAny } from "zod";

// TODO - default hidden
export interface Definition<T> {
	primaryKey?: boolean;
	accessorKey: keyof T;
	header: string;
	sortable?: boolean;
	cell?: (row: Row<T>) => JSX.Element;
	type: ZodTypeAny;
}

export type GetEntries<T> = () => Promise<T[]>;
export type CreateEntry<T> = (entry: T) => Promise<void>;
export type UpdateEntry<T> = (from: T, to: T) => Promise<void>;
export type DeleteEntry<T> = (entry: T) => Promise<void>;
export type OnSubmit<T> = (to: T) => void;

export type SchemaType = z.ZodObject<
	any,
	"strip",
	z.ZodTypeAny,
	{
		[x: string]: any;
	},
	{
		[x: string]: any;
	}
>;
export type FormType = UseFormReturn<
	{
		[x: string]: any;
	},
	any,
	undefined
>;
