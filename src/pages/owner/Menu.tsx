import { useEffect, useMemo, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  createCategory,
  createMenuItem,
  deleteMenuItem,
  getCategories,
  getMenuItems,
  updateMenuItem,
  type MenuCategory,
  type MenuItem,
} from "../../api/menu";

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<
    MenuCategory[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] =
    useState(false);

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] =
    useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");

  const [categoryName, setCategoryName] = useState("");

  const [saving, setSaving] = useState(false);

  async function loadMenu() {
    try {
      setLoading(true);
      setError("");

      const [categoryData, itemData] =
        await Promise.all([
          getCategories(),
          getMenuItems(),
        ]);

      setCategories(categoryData);
      setItems(itemData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load menu.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        String(item.category_id) === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, categoryFilter]);

  function categoryNameFor(item: MenuItem) {
    return (
      categories.find(
        (category) => category.id === item.category_id,
      )?.name || "Uncategorized"
    );
  }

  async function handleCreateCategory(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!categoryName.trim()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const category = await createCategory({
        name: categoryName.trim(),
      });

      setCategories((current) => [
        ...current,
        category,
      ]);

      setCategoryName("");
      setShowAddCategory(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create category.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateItem(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!itemName.trim() || !itemPrice) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const item = await createMenuItem({
        name: itemName.trim(),
        description:
          itemDescription.trim() || null,
        price: Number(itemPrice),
        category_id: itemCategory
          ? Number(itemCategory)
          : null,
        is_available: true,
      });

      setItems((current) => [...current, item]);

      setItemName("");
      setItemDescription("");
      setItemPrice("");
      setItemCategory("");
      setShowAddItem(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create menu item.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(item: MenuItem) {
    try {
      setError("");

      const updated = await updateMenuItem(item.id, {
        is_available: !item.is_available,
      });

      setItems((current) =>
        current.map((currentItem) =>
          currentItem.id === updated.id
            ? updated
            : currentItem,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update item.",
      );
    }
  }

  async function handleDelete(item: MenuItem) {
    if (
      !window.confirm(
        `Delete "${item.name}"?`,
      )
    ) {
      return;
    }

    try {
      setError("");

      await deleteMenuItem(item.id);

      setItems((current) =>
        current.filter(
          (currentItem) =>
            currentItem.id !== item.id,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete item.",
      );
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
              Restaurant
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
              Menu
            </h1>

            <p className="mt-2 text-gray-600">
              Manage categories, prices and item availability.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setShowAddCategory(true)
              }
            >
              + Category
            </Button>

            <Button
              type="button"
              onClick={() => setShowAddItem(true)}
            >
              + Add Item
            </Button>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </Card>
        )}

        <Card className="p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search menu items..."
              className="flex-1 rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 outline-none focus:border-[#E4572E]"
            />

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 outline-none focus:border-[#E4572E]"
            >
              <option value="all">
                All categories
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {loading ? (
          <Card className="p-10 text-center">
            <p className="text-sm text-gray-500">
              Loading menu...
            </p>
          </Card>
        ) : filteredItems.length === 0 ? (
          <Card className="p-10 text-center">
            <h2 className="text-lg font-bold text-[#17211D]">
              No menu items found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add your first menu item.
            </p>

            <div className="mt-5">
              <Button
                type="button"
                onClick={() =>
                  setShowAddItem(true)
                }
              >
                Add Menu Item
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#17211D]">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#E4572E]">
                      {categoryNameFor(item)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.is_available
                        ? "bg-green-100 text-[#176B4D]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.is_available
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>
                )}

                <p className="mt-5 text-2xl font-bold text-[#17211D]">
                  NPR{" "}
                  {Number(item.price).toLocaleString()}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      handleToggle(item)
                    }
                  >
                    {item.is_available
                      ? "Mark Unavailable"
                      : "Mark Available"}
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={() =>
                      handleDelete(item)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {showAddCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-[#17211D]">
                Add Category
              </h2>

              <form
                onSubmit={handleCreateCategory}
                className="mt-5 space-y-5"
              >
                <input
                  value={categoryName}
                  onChange={(event) =>
                    setCategoryName(
                      event.target.value,
                    )
                  }
                  placeholder="Momo"
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 outline-none focus:border-[#E4572E]"
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() =>
                      setShowAddCategory(false)
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={saving}
                  >
                    {saving
                      ? "Creating..."
                      : "Create"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {showAddItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <Card className="w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-[#17211D]">
                Add Menu Item
              </h2>

              <form
                onSubmit={handleCreateItem}
                className="mt-5 space-y-4"
              >
                <input
                  value={itemName}
                  onChange={(event) =>
                    setItemName(event.target.value)
                  }
                  placeholder="Chicken Momo"
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 outline-none focus:border-[#E4572E]"
                />

                <textarea
                  value={itemDescription}
                  onChange={(event) =>
                    setItemDescription(
                      event.target.value,
                    )
                  }
                  placeholder="Steamed chicken momo..."
                  rows={3}
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 outline-none focus:border-[#E4572E]"
                />

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={itemPrice}
                  onChange={(event) =>
                    setItemPrice(event.target.value)
                  }
                  placeholder="250"
                  className="w-full rounded-lg border border-[#E5E1D8] px-4 py-3 outline-none focus:border-[#E4572E]"
                />

                <select
                  value={itemCategory}
                  onChange={(event) =>
                    setItemCategory(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 outline-none focus:border-[#E4572E]"
                >
                  <option value="">
                    Uncategorized
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() =>
                      setShowAddItem(false)
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={saving}
                  >
                    {saving
                      ? "Creating..."
                      : "Create Item"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}