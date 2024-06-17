import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

export type HeroBookType = {
  shortDescription:string;
  subTitle: string;
  firstText: string;
  secondText:string;
  title: string;
  author: string;
  price: string;
  bookFeatures: string[];
  gradient: string;
  imagePath: string;
  gradientUrl?:string;
  checksTableTextBlack?:boolean;
  iconElements?: {
    icon: IconProps["name"];
    text: string;
  }[];
};
export type TrustReviewsType = {
  username:string;
  book:string;
  purchaseDate:string;
  avatar:string; //maybe the url?
  text:string;
}
export type TrustHeaderType = {
  text:string;
}