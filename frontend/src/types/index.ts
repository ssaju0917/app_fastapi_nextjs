export type Feature = {
  id: number;
  name: string;
  description: string;
  user_id: number;
};

export type User = {
  id: number;
  name: string;
  features: Feature[];
};