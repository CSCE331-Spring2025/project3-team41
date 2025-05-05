// the entry point for the router

import AppSidebar from "@/components/AppSidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";


export const Route = createRootRoute({
	component: () => (
		<div>
		<AppSidebar>
			<Outlet />
			{/* <TanStackRouterDevtools /> */}
		</AppSidebar>
		</div>
	),
});
