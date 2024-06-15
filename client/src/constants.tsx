import { Codesandbox, CompassIcon, DollarSign } from "lucide-react";
import { HeroBookType } from "./types";


export const commonUserCredentials = {
  email: "test123@gmail",
  password: "test123",
};


export const HeroBooks:HeroBookType[] = [{
  subTitle: "Simple, fast and easy way to earn money while sitting in your comfortable chair at home?",
  firstText:"Buy this e-book if you’re interested in earning money online!",
  secondText:"With our unique 5 small steps technique after reading this book you’ll be thriving in online earning techniques and you’ll be able to find your own special niche!",
  title:"Earn money online!",
  author:"@idslw",
  price:"49$",
  imagePath:"/LaptopWheel.jpg",
  bookFeatures: ["Unique 5 step learning process","Find multiple niches", "Attract new customers", "10 ready-to-implement ideas"],
  gradient:"var(--BlueGradient, linear-gradient(180deg, #2B769D 0%, #276E98 34%, #174E84 100%))"
},
{
  subTitle: "Do you want to escape your boring 9-5 job? Would you like to try and experience something new?",
  firstText:"With all the unique benefits this book will help you gain financial freedom in less than a year!",
  secondText: "Let us show you the easiest way to escape the office-hours job. This book features:",
  title: "Easy way to escape",
  author: "@idslw",
  price: "79$",
  bookFeatures: ["Unique 5 step learning process", "Find multiple niches", "Attract customers", "10 ready-to-implement ideas"],
  gradient: "var(--OrangeGradient, linear-gradient(180deg, #ED5100 20%, #C25200 100%))",
  iconElements: [{
    icon:<CompassIcon/>,
    text:"Navigate your way to freedom!",
  },
  {
    icon:<Codesandbox/>,
    text:"Bright ideas on time management",
  },{
    icon:<DollarSign/>,
    text:"Navigate your way to freedom!",
  }],
  imagePath: "/EbookMoney.jpg"
}]
