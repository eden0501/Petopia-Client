import { isNil } from "lodash";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const resolveImageUrl = (url?: string) =>
  !isNil(url)
    ? url?.startsWith("http")
      ? url
      : `${SERVER_URL}/public${url}`
    : undefined;

export const getSizeInBytes = (sizeInMB: number) => sizeInMB * 1024 * 1024;
export const getSizeErrorMessage = (sizeInMB: number) =>
  "Image must be less than " + sizeInMB + "MB";
