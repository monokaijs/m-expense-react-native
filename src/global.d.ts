interface Trip {
  id?: number;
  name: string;
  description: string;
  destination: string;
  budget: number;
  date: string;
  requiresRiskAssessment: boolean;
  coordinate?: string;
}

interface Expense {
  id?: number;
  sku?: string;
  tripId: number;
  name: string;
  category: string;
  cost: number;
  description: string;
  date?: string;
}
