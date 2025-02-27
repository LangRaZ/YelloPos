"use client"; // Needed for client-side interactivity

import { useState, useEffect } from "react";
import { createProduct, getCategory } from "@/lib/supabase/api";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function CreateProductPage() {
    const [formData, setFormData] = useState<{
        name: string,
        categoryid: number,
        category: string | null,
        description: string,
        price: string,
        stock: string,
    }>({
        name: "",
        categoryid: 0,
        category: "",
        description: "",
        price: "",
        stock: "",
    });

    const [categories, setCategories] = useState<{id: number; name: string | null}[]>([]);
    const router = useRouter();

    useEffect(() => {
      async function fetchCategories() {
        const { data, error } = await getCategory();
        if (error) {
            console.error("Error fetching categories:", error);
            return;
        }
        if (data) {
          // console.log(data)
          setCategories(data.map((category) => ({ id: category.id, name: category.category_name })));
          // console.log(categories)
        }
    }
    fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "price" || name === "stock" ? parseFloat(value) || "" : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, description, price, stock, categoryid} = formData;
        if (!name || !price || !stock) {
            alert("Please fill in all required fields.");
            return;
        }

        const result = await createProduct(name, categoryid, description, Number(price), Number(stock));

        if (result) {
            alert("Product created successfully!");
            router.push("/product"); // Redirect to products page
        } else {
            alert("Failed to create product.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4">Create a New Product</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="border p-2 rounded"
                    required 
                />
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="border p-2 rounded">
                      {formData.category || "Select Category"}
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content className="bg-white border rounded shadow-lg p-2">
                      {categories.map((category) => (
                          <DropdownMenu.Item
                              key={category.id}
                              onSelect={() =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      categoryid: category.id,
                                      category: category.name,
                                  }))
                              }
                              className="p-2 hover:bg-gray-200 cursor-pointer"
                          >
                              {category.name}
                          </DropdownMenu.Item>
                      ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="border p-2 rounded"
                    required
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="border p-2 rounded"
                    required 
                />
                <input 
                    type="number" 
                    name="stock" 
                    placeholder="Stock Quantity" 
                    value={formData.stock} 
                    onChange={handleChange} 
                    className="border p-2 rounded"
                    required 
                />
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
}