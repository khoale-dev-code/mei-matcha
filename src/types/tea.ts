export type Tea = {
  name: string;
  japanese?: string;
  vietnamese: string;
  english: string;
  notes?: string[];
};

export type TeaHouse = {
  id: string;
  name: string;
  japanese?: string;
  region: string;
  description: string;
  image: string;
  imageAlt: string;
  teas: Tea[];
};
