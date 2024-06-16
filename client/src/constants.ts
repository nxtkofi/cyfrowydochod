import { HeroBookType, TrustReviewsType } from "./types";

export const commonUserCredentials = {
  email: "test123@gmail",
  password: "test123",
};

export const HeroBooks: HeroBookType[] = [
  {
    subTitle:
      "Simple, fast and easy way to earn money while sitting in your comfortable chair at home?",
    firstText: "Buy this e-book if you’re interested in earning money online!",
    secondText:
      "With our unique 5 small steps technique after reading this book you’ll be thriving in online earning techniques and you’ll be able to find your own special niche!",
    title: "Earn money online!",
    author: "@idslw",
    price: "49$",
    imagePath: "/LaptopWheel.jpg",
    bookFeatures: [
      "Unique 5 step learning process",
      "Find multiple niches",
      "Attract new customers",
      "10 ready-to-implement ideas",
    ],
    gradient:
      "var(--BlueGradient, linear-gradient(180deg, #2B769D 0%, #276E98 34%, #174E84 100%))",
  },
  {
    subTitle:
      "Do you want to escape your boring 9-5 job? Would you like to try and experience something new?",
    firstText:
      "With all the unique benefits this book will help you gain financial freedom in less than a year!",
    secondText:
      "Let us show you the easiest way to escape the office-hours job. This book features:",
    title: "Easy way to escape",
    author: "@idslw",
    price: "79$",
    bookFeatures: [
      "Unique 5 step learning process",
      "Find multiple niches",
      "Attract customers",
      "10 ready-to-implement ideas",
    ],
    gradient:
      "var(--OrangeGradient, linear-gradient(180deg, #ED5100 20%, #C25200 100%))",
    gradientUrl: "url(#orange-gradient)",
    iconElements: [
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
    imagePath: "/EbookMoney.jpg",
  },
  {
    subTitle:
      "Souds stupid? Who, and WHY, would name their book by an ironic acronym like that? Well, let me cook below.",
    firstText:
      "This book is our utlimate guide. Our all in one product. Our most loved, spoiled child. We have put our everything into it. Why the name? Buy this absolute gem and find out!",
    secondText: "This book has unique features such as:",
    title: "Monkey Business",
    checksTableTextBlack:true,
    author: "@idslw",
    price: "99$",
    bookFeatures: [
      "Unique 5 step learning process",
      "Find multiple niches",
      "Attract customers",
      "10 ready-to-implement ideas",
    ],
    gradient:
      "var(--PlatinumGradient, linear-gradient(256deg, #F2D7FF 20%, #A2E3FF 100%))",
    gradientUrl: "url(#platinum-gradient)",
    iconElements: [
      {
        icon: "banknote",
        text: "Ninja-Style money earning technique",
      },
      {
        icon: "gem",
        text: "Transfer your business into kingdom!",
      },
    ],
    imagePath: "/PlatinumEbook.jpg",
  },
];
export const TrustReviews:TrustReviewsType[] = [
  {
    username: "aniafata",
    book: "Monkey Business",
    purchaseDate: "01.01.2023",
    avatar: "url(#orange-gradient)",
    text: "It was the greatest decision in my life to buy the platinum eBook. It changed everything."
  },{
    username: "agata.sakurska",
    book: "Easy way to escape!",
    purchaseDate: "04.04.2024",
    avatar: "??",
    text: 'The "Easy way to escape" purchase was really a salvation for me. Now I can travel and work from the back of my van!'
  },{
    username: "micholinski",
    book: "Monkey Business",
    purchaseDate: "03.05.2024",
    avatar: "??",
    text: "I managed to efficiently scale my business with techniques provided in the Monkey Business. A real game-changer."
  }
]
