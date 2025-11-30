import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number with consistent locale to avoid hydration mismatch
const numberFormatter = new Intl.NumberFormat('es-BO')

export function formatNumber(n: number): string {
  return numberFormatter.format(n)
}

// Format currency in Bolivianos
const currencyFormatter = new Intl.NumberFormat('es-BO', {
  style: 'currency',
  currency: 'BOB',
})

export function formatCurrency(n: number): string {
  return currencyFormatter.format(n)
}
