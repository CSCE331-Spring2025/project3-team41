// a react context for the data table

import { Table } from "@tanstack/react-table";
import { createContext } from "react";

interface ContextType {
	table: Table<any>;
}

export const DataTableContext = createContext<ContextType>({
	table: {} as Table<any>,
});

