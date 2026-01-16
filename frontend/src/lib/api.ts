const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetcher = async (path: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error("API Error");
  return res.json();
};