import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from "./client";

export interface MenuCategory {
  id: number;
  name: string;
  sort_order: number;
  is_active: boolean;
}

export interface MenuItem {
  id: number;
  category_id: number | null;
  name: string;
  description: string | null;
  price: number;
  is_available: boolean;
}

export interface CreateCategoryData {
  name: string;
}

export interface CreateMenuItemData {
  name: string;
  category_id?: number | null;
  description?: string | null;
  price: number;
  is_available?: boolean;
}

export interface UpdateMenuItemData {
  name?: string;
  category_id?: number | null;
  description?: string | null;
  price?: number;
  is_available?: boolean;
}

export function getCategories() {
  return apiGet<MenuCategory[]>(
    "/api/menu/categories",
  );
}

export function createCategory(
  data: CreateCategoryData,
) {
  return apiPost<MenuCategory>(
    "/api/menu/categories",
    data,
  );
}

export function deleteCategory(categoryId: number) {
  return apiDelete<{ message: string }>(
    `/api/menu/categories/${categoryId}`,
  );
}

export function getMenuItems() {
  return apiGet<MenuItem[]>("/api/menu/items");
}

export function createMenuItem(
  data: CreateMenuItemData,
) {
  return apiPost<MenuItem>("/api/menu/items", data);
}

export function updateMenuItem(
  itemId: number,
  data: UpdateMenuItemData,
) {
  return apiPatch<MenuItem>(
    `/api/menu/items/${itemId}`,
    data,
  );
}

export function deleteMenuItem(itemId: number) {
  return apiDelete<{ message: string }>(
    `/api/menu/items/${itemId}`,
  );
}