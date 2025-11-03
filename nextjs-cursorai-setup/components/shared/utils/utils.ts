import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...args: any) {
  return twMerge(clsx(args));
}
