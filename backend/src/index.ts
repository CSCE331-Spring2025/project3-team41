import { serve } from "@hono/node-server";
import { Hono } from "hono";
import postgres from 'postgres'

const sql = postgres({
	user: "team_41",
	host: "csce-315-db.engr.tamu.edu", 
	database: "team_41_db", 
	password: "pink_and_fluffy",
}) // will use psql environment variables


const app = new Hono();

app.get("/", (c) => {
	return c.json({ status: "operational" });
});

app.get("/employees", async (c) => {
	const employees = await sql`SELECT * FROM employees`
	return c.json({employees});
});

app.get("/items/:item", async (c) => {
	const item = c.req.param("item");
	const items = await sql`SELECT * FROM menu WHERE item = ${item}`
	const data = c.json({items});
	const price = JSON.stringify(data);
	return data;
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
