export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.error ?? data ?? res.statusText;
    throw new Error(
      typeof message === "string" ? message : JSON.stringify(message)
    );
  }

  return data;
}
