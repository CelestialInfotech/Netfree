import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const avatarList = [
  "https://i.postimg.cc/fThpzcjY/avatar-1.webp",
  "https://i.postimg.cc/65NgWrLR/avatar-2.webp",
  "https://i.postimg.cc/5NMT4BqQ/avatar-3.webp",
  "https://i.postimg.cc/5NMT4BqY/avatar-4.webp",
  "https://i.postimg.cc/gkPQzVqw/avatar-5.webp",
  "https://i.postimg.cc/1RFb1C66/avatar-6.webp",
  "https://i.postimg.cc/2jWgNcvW/avatar-7.webp",
  "https://i.postimg.cc/J7XSC6JH/avatar-8.webp",
  "https://i.postimg.cc/BZFRfYDx/avatar-9.webp",
  "https://i.postimg.cc/fWd1Q2Xb/avatar-10.webp",

];
