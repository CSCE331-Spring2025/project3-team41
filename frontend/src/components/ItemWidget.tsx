import * as React from 'react';
import { useState } from 'react';

interface MenuItem {
	item: string;
	price: number;
	description: string;
	image_url: string;
	ingredients: string[];
}

export function ItemWidget({ item }: { item: MenuItem }) {
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md w-64">
            <h2 className="text-xl font-bold text-white">{item.item}</h2>
            <p className="text-gray-400">{item.description}</p>
            <p className="text-green-500 font-semibold">${item.price.toFixed(2)}</p>
            <div>
                <p>
                    Quantity:
                </p>
                <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="mt-2 p-1 border border-gray-600 rounded bg-gray-700 text-white"
                />
            </div>
        </div>
    );
}

export default ItemWidget;