import axios from "axios";

export const GetTokenProvider: {
  getToken?: () => Promise<string | null>;
} = {
  getToken: () =>
    Promise.resolve(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTczZTMyOTBjMmU1NDYxYmUyNzYyNzYiLCJpYXQiOjE3NzI0ODE4MTMsImV4cCI6MTc3Mjg0MTgxM30.96i4lWEZUDYeQoXscRy5goARGJSnw5lCNYgdOebGsLU",
    ),
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
