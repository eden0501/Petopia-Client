import { getSizeInBytes } from "@/utils/images";

export const MAX_POST_IMAGE_SIZE_MB = 10;
export const MAX_PROFILE_IMAGE_SIZE_MB = 5;
export const MAX_POST_IMAGE_SIZE = getSizeInBytes(MAX_POST_IMAGE_SIZE_MB);
export const MAX_PROFILE_IMAGE_SIZE = getSizeInBytes(MAX_PROFILE_IMAGE_SIZE_MB);