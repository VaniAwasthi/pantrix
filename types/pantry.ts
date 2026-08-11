export type ExpiryStatus = "expired" | "expiring-soon" | "fresh";

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  expiryStatus?: ExpiryStatus;
  daysUntilExpiry?: number;
}

export interface CreatePantryItemInput {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
}

export interface UpdatePantryItemInput extends Partial<CreatePantryItemInput> {}
