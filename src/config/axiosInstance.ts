import axios from "axios";

// TODO: Implement a proper token retrieval mechanism, e.g., from cookies or a context provider.
export const GetTokenProvider: {
  getToken?: () => Promise<string | null>;
} = {
  getToken: () => Promise.resolve(import.meta.env.VITE_AUTH_TOKEN || ""),
};

export const createAxiosInstance = (service: string, addToken = true) => {
  const instance = axios.create({
    baseURL: service,
  });

  if (addToken) {
    instance.interceptors.request.use(async (request) => {
      const authToken = await GetTokenProvider.getToken?.();

      request.headers.set("Authorization", `Bearer ${authToken}`);

      return request;
    });
  }

  return instance;
};
