import axios from "axios";

const dogApi = axios.create({ baseURL: "https://dogapi.dog/api/v2/facts" });

const catApi = axios.create({ baseURL: "https://catfact.ninja/fact" });

export const getRandomFact = async () => {
  try {
    const isDog = Math.random() > 0.5;
    const axiosInstance = isDog ? dogApi : catApi;

    const res = (await axiosInstance.get("")).data;

    return isDog ? res.data[0].attributes.body : res.fact;
  } catch (_error) {
    return "Did you know? Pets bring joy and companionship to millions of people worldwide!";
  }
};
