export interface Recipe{
  _id?: number;
  title: string;
  image: string;
  description: string;
  difficulty:  number;
  date?: string;
  published?: boolean;
}
