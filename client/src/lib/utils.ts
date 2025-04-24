import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumberShort(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "N/A";

  const numericValue = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;

  if (isNaN(numericValue)) return "N/A";

  const absNum = Math.abs(numericValue);

  if (absNum >= 1e12) {
    return (numericValue / 1e12).toFixed(2) + "T";
  }
  if (absNum >= 1e9) {
    return (numericValue / 1e9).toFixed(2) + "B";
  }
  if (absNum >= 1e6) {
    return (numericValue / 1e6).toFixed(2) + "M";
  }
  if (absNum >= 1e3) {
    return (numericValue / 1e3).toFixed(2) + "k";
  }
  return numericValue.toString();
}
