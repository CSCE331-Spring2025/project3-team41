import { Hono } from "hono";
import sql from "./sql.js";

const order = new Hono();

order.post("/", async (c) => {
  try {
    const { customer_name, drinks, price } = await c.req.json();
    console.log("Received order:", customer_name, drinks, price);

    await sql`
      INSERT INTO orders (customer_name, drinks, price, date, time)
      VALUES (${customer_name}, ${drinks}, ${price}, CURRENT_DATE, CURRENT_TIME)
    `;

    return c.json({ message: "Order submitted successfully!" });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to submit order." }, 500);
  }
});

order.get("/", async (c) => {
  const orders = await sql`SELECT * FROM orders ORDER BY date DESC, time DESC`;
  return c.json(orders);
});

export default order;
