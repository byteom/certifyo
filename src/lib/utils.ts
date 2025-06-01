import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID(): string {
  // Check if `crypto.randomUUID` is available in the environment
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID(); // Use `crypto.randomUUID()` if available
  } else {
    return uuidv4(); // Fallback to `uuidv4()` if `crypto.randomUUID` is not available
  }
}
