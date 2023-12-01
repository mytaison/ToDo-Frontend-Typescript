type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

function returnCorrectRequest(method: HTTP_METHOD, data: unknown): RequestInit {
  if (method === 'GET') {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

export async function sendAPIRequest<T>(
  url: string,
  method: HTTP_METHOD,
  data: unknown = {},
): Promise<T> {
  const response = await fetch(url, returnCorrectRequest(method, data));
  if (!response.ok) {
    const message = `An error has occured: ${response.status}.`;
    throw new Error(message);
  }
  return (await response.json()) as Promise<T>;
}