import { ApiError } from "./error";

export const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new ApiError({
      endpoint: url,
      statusCode: res.status,
    });
  }

  return res.json();
};
