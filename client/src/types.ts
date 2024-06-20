import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}
export type RoleType = "commonUser" | "admin";
export type HeroBookType = {
  semiLongDescription: string;
  bookId: string;
  shortDescription: string;
  subTitle: string;
  firstText: string;
  secondText: string;
  title: string;
  author: string;
  price: number; //int
  bookFeatures: string[];
  gradient: string;
  imagePath: string;
  emojiGradientUrl?: string;
  checksTableTextBlack?: boolean;
  iconElements?: {
    icon: IconProps["name"]; //czytaj to jako string
    text: string;
  }[];
};

export type avatarType =
  | "axolotl"
  | "koza"
  | "moneymouse"
  | "panda"
  | "rooster"
  | "snake"
  | "turtle"
  | "kodi"
  | "shark";

export type TrustReviewsType = {
  username: string;
  book: string;
  purchaseDate: string;
  avatar: avatarType; //maybe the url?
  text: string;
};
export type TrustHeaderType = {
  text: string;
};
export type MenuOptionsType = {
  access: RoleType[];
  optionName: string;
  path: string;
  iconName: IconProps["name"];
};

export type TicketType = {
  email?: string;
  subject: string;
  orderId?: string;
  messages: MessageType[];
  creationDate: number;
  status:
    | "Waiting for support response"
    | "Waiting for user response"
    | "Closed";
};

export type MessageType = {
  sender: "User" | "Support";
  message: string;
};
