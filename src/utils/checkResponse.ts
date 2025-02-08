export async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error(`Ошибка API: ${JSON.stringify(data)}`);
  }

  return data;
}
