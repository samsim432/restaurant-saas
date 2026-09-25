import { FormEvent, useMemo, useState } from "react";

import AppLayout from "../../layouts/AppLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  available: boolean;
}

const initialItems: MenuItem[] = [
  {
    id: 1,
    name: "Chicken Momo",
    category: "Momo",
    description: "Steamed chicken dumplings served with achar.",
    price: 180,
    available: true,
  },
  {
    id: 2,
    name: "Buff Momo",
    category: "Momo",
    description: "Classic buff momo with spicy achar.",
    price: 160,
    available: true,
  },
  {
    id: 3,
    name: "Chicken Chowmein",
    category: "Noodles",
    description: "Stir-fried noodles with chicken and vegetables.",
    price: 220,
    available: true,
  },
  {
    id: 4,
    name: "Thakali Set",
    category: "Main Course",
    description: "Traditional Nepali rice, dal, tarkari and meat.",
    price: 450,
    available: true,
  },
  {
    id: 5,
    name: "Coke",
    category: "Drinks",
    description: "Cold Coca-Cola.",
    price: 80,
    available: false,
  },
];

export default function Menu() {
  const [items, setItems] =
    useState<MenuItem[]>(initialItems);

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [newCategory, setNewCategory] =
    useState("Main Course");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const categories = [
    "All",
    ...Array.from(
      new Set(items.map((item) => item.category)),
    ),
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        category === "All" ||
        item.category === category;

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [items, category, search]);

  function toggleAvailability(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              available: !item.available,
            }
          : item,
      ),
    );
  }

  function deleteItem(id: number) {
    if (!window.confirm("Delete this menu item?")) {
      return;
    }

    setItems((current) =>
      current.filter((item) => item.id !== id),
    );
  }

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !price) {
      return;
    }

    const item: MenuItem = {
      id: Date.now(),
      name: name.trim(),
      category: newCategory,
      description: description.trim(),
      price: Number(price),
      available: true,
    };

    setItems((current) => [...current, item]);

    setName("");
    setNewCategory("Main Course");
    setDescription("");
    setPrice("");
    setShowModal(false);
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#E4572E]">
              Restaurant setup
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#17211D]">
              Menu
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage menu items, prices and availability.
            </p>
          </div>

          <Button onClick={() => setShowModal(true)}>
            + Add Menu Item
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Total items
            </p>

            <p className="mt-2 text-2xl font-bold text-[#17211D]">
              {items.length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Available
            </p>

            <p className="mt-2 text-2xl font-bold text-[#176B4D]">
              {items.filter((item) => item.available).length}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-gray-500">
              Unavailable
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-500">
              {items.filter((item) => !item.available).length}
            </p>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#E5E1D8] p-5">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((itemCategory) => (
                  <button
                    key={itemCategory}
                    type="button"
                    onClick={() =>
                      setCategory(itemCategory)
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                      category === itemCategory
                        ? "bg-[#E4572E] text-white"
                        : "bg-[#F7F5F0] text-gray-600"
                    }`}
                  >
                    {itemCategory}
                  </button>
                ))}
              </div>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search menu..."
                className="rounded-lg border border-[#E5E1D8] px-4 py-2.5 text-sm outline-none focus:border-[#E4572E] md:w-64"
              />
            </div>
          </div>

          <div className="divide-y divide-[#E5E1D8]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-semibold text-[#17211D]">
                      {item.name}
                    </h2>

                    <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs text-gray-500">
                      {item.category}
                    </span>

                    {!item.available && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                        Unavailable
                      </span>
                    )}
                  </div>

                  <p className="mt-2 max-w-2xl text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-lg font-bold text-[#17211D]">
                    NPR {item.price.toLocaleString()}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      toggleAvailability(item.id)
                    }
                    className={`rounded-lg px-4 py-2 text-xs font-semibold ${
                      item.available
                        ? "bg-green-50 text-[#176B4D]"
                        : "bg-[#F7F5F0] text-gray-600"
                    }`}
                  >
                    {item.available
                      ? "Available"
                      : "Make Available"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
            <div className="w-full max-w-lg rounded-xl bg-white p-7">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#17211D]">
                    Add menu item
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Add an item to your restaurant menu.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-xl text-gray-400"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={addItem}
                className="mt-6 space-y-5"
              >
                <div>
                  <label className="text-sm font-semibold">
                    Item name
                  </label>

                  <input
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Chicken Momo"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Category
                  </label>

                  <select
                    value={newCategory}
                    onChange={(event) =>
                      setNewCategory(event.target.value)
                    }
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm"
                  >
                    <option>Main Course</option>
                    <option>Momo</option>
                    <option>Noodles</option>
                    <option>Drinks</option>
                    <option>Desserts</option>
                    <option>Starters</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(event) =>
                      setPrice(event.target.value)
                    }
                    placeholder="180"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Short description..."
                    rows={3}
                    className="mt-2 w-full resize-none rounded-lg border border-[#E5E1D8] px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Add Item
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}