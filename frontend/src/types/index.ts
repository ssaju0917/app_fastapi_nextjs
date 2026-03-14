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

export type Diary = {
  id: number;
  title: string;
  content: string;
  diary_date: string;
};

export type DiaryCreate = {
  title: string;
  content: string;
};