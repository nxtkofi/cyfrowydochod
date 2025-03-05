import dynamicIconImports from "lucide-react/dynamicIconImports";
import {
  BookTypeRequest,
  MenuOptionsType,
  Status,
  TicketType,
  TrustReviewsType,
  avatarType,
} from "./types";

export const commonUserCredentials = {
  email: "test123@gmail",
  password: "test123",
};
export const iconNames = Object.keys(dynamicIconImports);

export const statuses: Status[] = [
  {
    value: "latest",
    label: "Created: Latest to Oldest",
  },
  {
    value: "oldest",
    label: "Created: Oldest to Latest",
  },
  {
    value: "purchaseDateOld",
    label: "Purchase date: Latest to Oldest",
  },
  {
    value: "done",
    label: "Purchase date: Oldest to Latest",
  },
];

export const book1Request: BookTypeRequest = {
  newBook: {
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed tincidunt augue, vitae pharetra purus. Ut semper orci justo, sit amet consequat neque iaculis eu. Nam elit sapien, finibus sit amet libero in, varius luctus lorem. Donec lobortis, est consequat facilisis vestibulum, nulla dolor tincidunt nibh, nec fringilla eros justo et ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam at sapien ornare, tempus quam eu at sapien ornare, tempus quam eu",
    shortDescription:
      "Great starter. This book contains every important money-making concept that’s out there!",
    subTitle:
      "Simple, fast and easy way to earn money while sitting in your comfortable chair at home?",
    firstText: "Buy this e-book if you’re interested in earning money online!",
    secondText:
      "With our unique 5 small steps technique after reading this book you’ll be thriving in online earning techniques and you’ll be able to find your own special niche!",
    title: "Earn money online!",
    author: "@idslw",
    price: 49,
    imagePath: "/LaptopWheel.jpg",

    gradient:
      "linear-gradient(0deg, rgba(78,133,155,1) 0%, RGB(116, 193, 226) 100%)",
    isHeroBook: true,
  },
  bookFeaturesList: [
    "Unique 5 step learning process",
    "Find multiple niches",
    "Attract new customers",
    "10 ready-to-implement ideas",
  ],
  bookIconElementsList: [],
};
export const book2Request: BookTypeRequest = {
  newBook: {
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed tincidunt augue, vitae pharetra purus. Ut semper orci justo, sit amet consequat neque iaculis eu. Nam elit sapien, finibus sit amet libero in, varius luctus lorem. Donec lobortis, est consequat facilisis vestibulum, nulla dolor tincidunt nibh, nec fringilla eros justo et ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam at sapien ornare, tempus quam eu at sapien ornare, tempus quam eu",
    shortDescription:
      "This book will take you straight to action. We’re saying it’s gonna allow you to leave your 9-5.",
    subTitle:
      "Do you want to escape your boring 9-5 job? Would you like to try and experience something new?",
    firstText:
      "With all the unique benefits this book will help you gain financial freedom in less than a year!",
    secondText:
      "Let us show you the easiest way to escape the office-hours job. This book features:",
    title: "Earn money online!",
    author: "@idslw",
    price: 79,
    imagePath: "/EbookMoney.jpg",
    gradient:
      "linear-gradient(25deg, rgba(219,105,43,1) 0%, RGB(255, 206, 159) 100%)",
    isHeroBook: true,
  },
  bookFeaturesList: [
    "Unique 5 step learning process",
    "Find multiple niches",
    "Attract new customers",
    "10 ready-to-implement ideas",
  ],
  bookIconElementsList: [
    {
      icon: "compass",
      text: "Navigate your way to freedom!",
    },
    {
      icon: "codesandbox",
      text: "Bright ideas on time management",
    },
    {
      icon: "circle-dollar-sign",
      text: "Rise your income leves!",
    },
  ],
};
export const book3Request: BookTypeRequest = {
  newBook: {
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed tincidunt augue, vitae pharetra purus. Ut semper orci justo, sit amet consequat neque iaculis eu. Nam elit sapien, finibus sit amet libero in, varius luctus lorem. Donec lobortis, est consequat facilisis vestibulum, nulla dolor tincidunt nibh, nec fringilla eros justo et ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam at sapien ornare, tempus quam eu at sapien ornare, tempus quam eu",
    shortDescription:
      "We call it The Bible of online money making. Infinite knowledge awaits within.",
    subTitle:
      "Souds stupid? Who, and WHY, would name their book by an ironic acronym like that? Well, let me cook below.",
    firstText:
      "This book is our utlimate guide. Our all in one product. Our most loved, spoiled child. We have put our everything into it. Why the name? Buy this absolute gem and find out!",
    secondText: "This book has unique features such as:",
    title: "Monkey Business",
    author: "@idslw",
    price: 109,
    gradient:
      "linear-gradient(60deg, rgba(224,152,236,0.8) 0%, RGBA(166, 226, 245, 0.86) 100%)",
    imagePath: "/PlatinumEbook.jpg",
    isHeroBook: true,
  },
  bookFeaturesList: [
    "Unique 5 step learning process",
    "Find multiple niches",
    "Attract new customers",
    "10 ready-to-implement ideas",
  ],
  bookIconElementsList: [
    {
      icon: "banknote",
      text: "Ninja-Style money earning technique",
    },
    {
      icon: "gem",
      text: "Transfer your business into kingdom!",
    },
  ],
};

export const TrustReviews: TrustReviewsType[] = [
  {
    username: "aniafata",
    book: "Monkey Business",
    purchaseDate: "01.01.2023",
    avatar: "koza",
    text: "It was the greatest decision in my life to buy the platinum eBook. It changed everything.",
  },
  {
    username: "agata.sakurska",
    book: "Easy way to escape!",
    purchaseDate: "04.04.2024",
    avatar: "kodi",
    text: 'The "Easy way to escape" purchase was really a salvation for me. Now I can travel and work from the back of my van!',
  },
  {
    username: "micholinski",
    book: "Monkey Business",
    purchaseDate: "03.05.2024",
    avatar: "axolotl",
    text: "I managed to efficiently scale my business with techniques provided in the Monkey Business. A real game-changer.",
  },
  {
    username: "donald.musk",
    book: "Monkey Business",
    purchaseDate: "01.08.2023",
    avatar: "panda",
    text: "It was the greatest decision in my life to buy the platinum eBook. It changed everything.",
  },
];

export const MenuOptions: MenuOptionsType[] = [
  {
    access: ["commonUser", "admin"],
    optionName: "Profile",
    iconName: "user",
    path: "/profile",
  },
  {
    access: ["commonUser", "admin"],
    optionName: "Billing",
    iconName: "archive",
    path: "/profile/billing",
  },
  {
    access: ["commonUser", "admin"],
    optionName: "Settings",
    iconName: "settings",
    path: "/profile/settings",
  },
  {
    access: ["commonUser", "admin"],
    optionName: "Orders",
    iconName: "book-copy",
    path: "/profile/orders",
  },
  {
    access: ["admin"],
    optionName: "Admin panel",
    iconName: "user-round-cog",
    path: "/profile/adminpanel",
  },
  {
    access: ["admin"],
    optionName: "Add eBook",
    path: "/profile/addbook",
    iconName: "book-plus",
  },
  {
    access: ["commonUser"],
    optionName: "Support",
    iconName: "smile",
    path: "/profile/support",
  },
  {
    access: ["commonUser", "admin"],
    optionName: "Log out",
    iconName: "log-out",
    path: "/logout",
  },
];

export const Tickets: TicketType[] = [
  {
    subject: "My ebook won't open",
    orderId: "102412f-129giud81-sf875gag",
    messages: [
      {
        sender: "User",
        message:
          "Hi I'm having trouble with Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet vestibulum mi, eget efficitur odio. Sed porta turpis quis erat gravida, eu lobortis ligula tincidunt. Phasellus iaculis lorem in eros maximus, ac ullamcorper nibh sagittis. Mauris ultricies malesuada sem, eget malesuada diam scelerisque imperdiet. Quisque at vehicula mi. Fusce ac fringilla libero. Sed sed auctor felis. Vestibulum elementum lorem magna, eget aliquam orci dapibus ut. Cras ultrices justo a eleifend blandit. Praesent quis nunc et magna ultricies sodales. Quisque sapien diam, fringilla vel egestas at, congue ut massa. Quisque justo nulla, pretium placerat elementum a, semper nec mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
        id: "",
        createdAt: undefined,
      },
      {
        sender: "Support",
        message:
          "Hi! Thanks for reaching out. Could you please describe your problem in details so that I could proceed with helping you? This ticket will automatically close within 4 days of no response. ",
        id: "",
        createdAt: undefined,
      },
    ],
    creationDate: 1718726671,
    status: "Waiting for support response",
  },
];
export const avatars: avatarType[] = [
  "axolotl",
  "koza",
  "mouse",
  "panda",
  "rooster",
  "snake",
  "turtle",
  "kodi",
  "octopus",
];
