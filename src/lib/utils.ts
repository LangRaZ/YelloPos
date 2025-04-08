import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCode(prefix: string, number: number): string{
  return `${prefix}${number.toString().padStart(4, '0')}`;
}