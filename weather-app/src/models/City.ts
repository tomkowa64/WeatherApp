export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: { [key: string]: number };
}