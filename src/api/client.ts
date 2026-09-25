const API_BASE_URL = "http://127.0.0.1:8000";

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { auth = true, headers, ...requestOptions } = options;

  const requestHeaders = new Headers(headers);

  requestHeaders.set("Content-Type", "application/json");

  if (auth) {
    const token = localStorage.getItem("access_token");

    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: requestHeaders,
  });

  if (response.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login";

    throw new Error("Your session has expired.");
  }

  const contentType = response.headers.get("content-type");

  const data =
    contentType?.includes("application/json")
      ? await response.json()
      : null;

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data as T;
}

export function apiGet<T>(path: string, auth = true) {
  return apiRequest<T>(path, {
    method: "GET",
    auth,
  });
}

export function apiPost<T>(
  path: string,
  body?: unknown,
  auth = true,
) {
  return apiRequest<T>(path, {
    method: "POST",
    auth,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiPatch<T>(
  path: string,
  body?: unknown,
  auth = true,
) {
  return apiRequest<T>(path, {
    method: "PATCH",
    auth,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiDelete<T>(path: string, auth = true) {
  return apiRequest<T>(path, {
    method: "DELETE",
    auth,
  });
}