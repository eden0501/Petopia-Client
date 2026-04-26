import { isNil } from "lodash";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const resolveImageUrl = (url?: string) =>
  !isNil(url)
    ? url?.startsWith("http")
      ? url
      : `${SERVER_URL}/public${url}`
    : undefined;

const MB_UNIT = 1024 * 1024;

export const getSizeInBytes = (sizeInMB: number) => sizeInMB * MB_UNIT;
export const getSizeErrorMessage = (sizeInMB: number) =>
  "File must be an image, and less than " + sizeInMB / MB_UNIT + "MB";
