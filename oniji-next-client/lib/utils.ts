import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setLanguagePreference(lang: string) {
  localStorage.setItem('preferredLanguage', lang);
}

export function getLanguagePreference() {
  return localStorage.getItem('preferredLanguage') || 'en'; // Default to English
}