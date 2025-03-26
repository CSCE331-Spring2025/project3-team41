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

// Get profit over time
app.get("/report/SalesOverTime", async (c) => {
	const profitOverTime = await sql`
		SELECT 
			date,
			SUM(price) - (
		  		SELECT coalesce(SUM(i.cost), 0)
		  		FROM unnest(o.drinks) as drink
		  		JOIN menu m ON m.item = drink
		  		JOIN unnest(m.ingredients) as ing ON TRUE
		  		JOIN ingredients i ON i.ingredient = ing
			) as profit
	  	FROM 
			orders o
	  	GROUP BY 
			date
	  	ORDER BY 
			date ASC`;
	return c.json(profitOverTime);
});

// Get top 10 selling items
app.get("/report/TopItems", async (c) => {
	const topItems = await sql`
		SELECT
            unnest(drinks) AS item,
            COUNT(*) AS times_ordered
    	FROM
            orders
        GROUP BY
            item
        ORDER BY
            times_ordered DESC
        LIMIT 10`;
	return c.json(topItems);
});


//Verify if username and password work
app.get("/logins/:username/:password", async (c) => {
	const username = c.req.param("username");
	const password = c.req.param("password");
	const items = await sql`SELECT * FROM logins WHERE username = '${username}' AND password = '${password}'`;
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
