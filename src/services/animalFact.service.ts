import { createAxiosInstance } from "../config/axiosInstance";

const dogApi = createAxiosInstance("https://dogapi.dog/api/v2/facts");

const catApi = createAxiosInstance("https://catfact.ninja/fact");

export const getRandomFact = async () => {
  try {
    const isDog = Math.random() > 0.5;
    const axiosInstance = isDog ? dogApi : catApi;

    const res = (await axiosInstance.get("")).data;

    return isDog ? res.data[0].attributes.body : res.fact;
  } catch (error) {
    console.log("error", error);
    return "Did you know? Pets bring joy and companionship to millions of people worldwide!";
  }
};
