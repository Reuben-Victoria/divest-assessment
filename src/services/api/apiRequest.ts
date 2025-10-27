type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function apiRequest<T>(
  url: string,
  method: HttpMethod = "GET",
  body?: unknown
): Promise<T> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
