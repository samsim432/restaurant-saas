import { apiGet, apiPatch } from "./client";

export interface Restaurant {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  phone: string | null;
  is_active: boolean;
}

export interface RestaurantUpdate {
  name?: string;
  address?: string | null;
  city?: string | null;
  phone?: string | null;
}

export function getRestaurant() {
  return apiGet<Restaurant>("/api/restaurant");
}

export function updateRestaurant(data: RestaurantUpdate) {
  return apiPatch<Restaurant>("/api/restaurant", data);
}