import { ReactNode } from "react";

export type HeroBookType = {
  subTitle: string;
  firstText: string;
  secondText:string;
  title: string;
  author: string;
  price: string;
  bookFeatures: string[];
  gradient: string;
  imagePath: string;
  iconElements?: {
    icon: ReactNode;
    text: string;
  }[];
};
