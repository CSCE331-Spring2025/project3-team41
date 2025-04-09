import { Hono } from "hono";
import sql from "./sql.js";

const order = new Hono();

async function addXReport(customer_name: any, drinks: any, price: any) {
	await sql`CREATE TABLE IF NOT EXISTS xreport (
    report_id SERIAL PRIMARY KEY,
    customer_name TEXT,
    drinks VARCHAR(40)[],
    price DOUBLE PRECISION
  )`;

	await sql`INSERT INTO xreport (customer_name, drinks, price) 
  VALUES (${customer_name}, ${drinks}, ${price})`;
}

order.post("/", async (c) => {
	try {
		const { customer_name, drinks, price } = await c.req.json();
		console.log("Received order:", customer_name, drinks, price);

		await sql`
      INSERT INTO orders (customer_name, drinks, price, date, time)
      VALUES (${customer_name}, ${drinks}, ${price}, CURRENT_DATE, CURRENT_TIME)
    `;

		await addXReport(customer_name, drinks, price);

		return c.json({ message: "Order submitted successfully!" });
	} catch (error) {
		console.error(error);
		return c.json({ error: "Failed to submit order." }, 500);
	}
});

order.get("/", async (c) => {
	const orders =
		await sql`SELECT * FROM orders ORDER BY date DESC, time DESC`;
	return c.json(orders);
});

order.get("/xreport", async (c) => {
	try {
		const report = await sql`SELECT * FROM xreport`;
		return c.json(report);
	} catch {
		return c.json([]);
	}
});

order.get("/zreport", async (c) => {
	try {
		const report = await sql`SELECT * FROM xreport`;
		await sql`DROP TABLE IF EXISTS xreport`;
		console.log("Z report of ", report);
		return c.json(report);
	} catch {
		return c.json([]);
	}
});

export default order;
