import type { ExpiryStatus } from "@/types/pantry";
import { EXPIRY_WARNING_DAYS } from "./constants";

export function normalizeIngredient(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getDaysUntilExpiry(expiryDate: string | Date): number {
  const expiry = new Date(expiryDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  const diffMs = expiry.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getExpiryStatus(expiryDate: string | Date): ExpiryStatus {
  const days = getDaysUntilExpiry(expiryDate);
  if (days < 0) return "expired";
  if (days <= EXPIRY_WARNING_DAYS) return "expiring-soon";
  return "fresh";
}

export function formatExpiryLabel(expiryDate: string | Date): string {
  const days = getDaysUntilExpiry(expiryDate);
  if (days < 0) return `Expired ${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ago`;
  if (days === 0) return "Expires today";
  if (days === 1) return "Expires tomorrow";
  return `Expires in ${days} days`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
