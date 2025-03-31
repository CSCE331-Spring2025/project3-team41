import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/constants";
import { ok } from "@/lib/fetchUtils";

export const Route = createFileRoute("/order")({
  component: RouteComponent,
});

interface MenuItem {
  item: string;
  price: number;
  description: string;
  ingredients: string[];
  imageUrl: string;
}

interface OrderItem {
  item: string;
  quantity: number;
  price: number;
}

function RouteComponent() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(1);

  useEffect(() => {
    async function fetchMenu() {
      const res = await ok(fetch(`${API_URL}/edit/menu`));
      const data = await res.json();
  
      const formattedMenu = data.map((item: any) => ({
        ...item,
        imageUrl: item.image_url,
      }));
  
      setMenu(formattedMenu);
    }
    fetchMenu();
  }, []);

  const openPopup = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowPopup(true);
  };

  const addToCart = () => {
    if (selectedItem) {
      setCart([
        ...cart,
        {
          item: selectedItem.item,
          quantity,
          price: selectedItem.price,
        },
      ]);
      setShowPopup(false);
    }
  };

  const openEditPopup = (index: number) => {
    setEditIndex(index);
    setEditQuantity(cart[index].quantity);
  };
  

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const submitOrder = async () => {
    const drinks = cart.flatMap((c) =>
      Array(c.quantity).fill(c.item)
    );
    console.log("Submitting order:", customerName, drinks, total);

    try {
      await ok(
        fetch(`${API_URL}/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_name: customerName,
            drinks,
            price: total,
          }),
        })
      );
      alert("Order submitted!");
      setCart([]);
      setCustomerName("");
    } catch (err) {
      console.error("Failed to submit order:", err);
      alert("Failed to submit order.");
    }
  };


  return (
    <div className="px-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Order Boba</h1>

      <input
        type="text"
        placeholder="Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        {menu.map((m) => (
          <button
            key={m.item}
            onClick={() => openPopup(m)}
            className="p-2 border rounded flex flex-col items-center"
          >
            <img src={m.imageUrl} alt={m.item} className="w-32 h-32 object-cover" />
            <span>{m.item}</span>
            <span>${m.price}</span>
          </button>
        ))}
      </div>

      {showPopup && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-4 rounded shadow-lg flex flex-col gap-2">
            <h2 className="text-xl font-bold">Customize {selectedItem.item}</h2>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="p-2 border rounded"
            />
            <button
              onClick={addToCart}
              className="p-2 bg-green-500 text-white rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {editIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-4 rounded shadow-lg flex flex-col gap-2">
            <h2 className="text-xl font-bold">Edit {cart[editIndex].item}</h2>
            <input
              type="number"
              min="1"
              value={editQuantity}
              onChange={(e) => setEditQuantity(parseInt(e.target.value))}
              className="p-2 border rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const updatedCart = [...cart];
                  updatedCart[editIndex].quantity = editQuantity;
                  setCart(updatedCart);
                  setEditIndex(null);
                }}
                className="p-2 bg-green-500 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => {
                  const updatedCart = cart.filter((_, i) => i !== editIndex);
                  setCart(updatedCart);
                  setEditIndex(null);
                }}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
              <button
                onClick={() => setEditIndex(null)}
                className="p-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold">Cart</h2>
     
      <ul>
        {cart.map((c, index) => (
          <li key={index} onClick={() => openEditPopup(index)}>
            {c.quantity} x {c.item} (${c.price} each)
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>

      <button
        onClick={submitOrder}
        className="p-2 bg-blue-500 text-white rounded"
        disabled={cart.length === 0 || !customerName}
      >
        Submit Order
      </button>

      
    </div>
  );
}

export default RouteComponent;
