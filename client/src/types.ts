import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}
export type BillingType = {
  fullName: string;
  streetName: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  addressId?: string;
};
export type UserModel = {
  id: string;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  role: RoleType;
  orders?: string[];
  billingAddress?: {};
  tickets?: {};
};
export type UserUpdateModel = Pick<
  UserModel,
  "username" | "email" | "password"
>;

export type handleInputChangeType = (
  e: string,
  name: "email" | "username" | "password" | "repeatPassword"
) => void;
export type ValidationPresetsType = {
  email: ValidationRulesType;
  username: ValidationRulesType;
  password: ValidationRulesType;
};
export type userInputType = {
  email: string;
  password: string;
  username?: string;
};
export type ValidationRulesType = {
  min: number;
  max: number;
  spaceAllowed: boolean;
  mustBeEmail: boolean;
  mustContain: {
    bigLetter: boolean;
    number: boolean;
    specialChar: boolean;
  };
};
export type RoleType = "commonUser" | "admin";
export type BookTypeRequest = {
  newBook: {
    semiLongDescription: string;
    bookId?: string;
    shortDescription: string;
    subTitle: string;
    firstText: string;
    secondText: string;
    title: string;
    author: string;
    price: number; //int
    gradient: string;
    imagePath: string;
    emojiGradientUrl?: string;
    checksTableTextBlack?: boolean;
  };
  bookFeatures: string[];
  iconElements?: {
    icon: IconProps["name"]; //czytaj to jako string
    text: string;
  }[];
};
export type BookType = {
  semiLongDescription: string;
  bookId?: string;
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
  | "mouse"
  | "panda"
  | "rooster"
  | "snake"
  | "turtle"
  | "kodi"
  | "octopus";

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
  id?: string;
  email?: string;
  subject: string;
  orderId?: string;
  messages: MessageType[];
  date: number;
  status:
    | "Waiting for support response"
    | "Waiting for user response"
    | "Closed";
};

export type MessageType = {
  id: string;
  createdAt: Date;
  sender: "User" | "Support" | "Admin";
  message: string;
};

export type UserPreferences = {
  avatar: avatarType;
  getNewsLetter: boolean;
  getPriceDrops: boolean;
  getTrendingEbooks: boolean;
  darkMode: boolean;
};
export type UserPreferencesChecks = {
  getNewsLetter: boolean;
  getPriceDrops: boolean;
  getTrendingEbooks: boolean;
};
export type AuthType = {
  id: string;
  email: string;
  accessToken: string;
  role: RoleType;
  username: string;
  preferences: UserPreferences;
};
