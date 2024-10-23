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

export function parseCustomDateString(dateString: string): number {
  if (!dateString) {
    return Date.now();
  }
  const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{6}) ([+-]\d{4}) (\w+)/;
  const match = dateString.match(regex);
  
  if (match) {
    const [_, year, month, day, hour, minute, second, microsecond, offset] = match;
    const date = new Date(Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second),
      parseInt(microsecond) / 1000
    ));
    
    // Apply the offset
    const offsetMinutes = parseInt(offset.slice(0, 3)) * 60 + parseInt(offset.slice(3));
    date.setMinutes(date.getMinutes() - offsetMinutes);
    
    return date.getTime();
  }
  
  console.error('Failed to parse date string:', dateString);
  return Date.now(); // Fallback to current time if parsing fails
}