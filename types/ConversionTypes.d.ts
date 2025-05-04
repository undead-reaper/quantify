import { LucideIcon } from "lucide-react";

declare global {
  export type Unit = {
    name: string;
    symbol: string;
    ratio: number;
  };
}

declare global {
  export type Category = {
    name: string;
    icon: LucideIcon;
    baseUnit: string;
    units: Unit[];
  };
}
