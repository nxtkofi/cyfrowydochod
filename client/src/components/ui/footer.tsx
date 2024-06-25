import { Facebook, Instagram } from "lucide-react";
import { FunctionComponent } from "react";
import Wrapper from "./wrapper";

const NavigationOptions = () => {
  return (
    <div className="flex  flex-row text-white text-base font-extrabold leading-[4rem]">
      <div className="flex-col">
        <p>Home</p>
        <p>All eBooks</p>
        <p>Contact</p>
      </div>
      <div className="flex-cold ml-20">
        <p>Login/Register</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

<NavigationOptions />;
const CompanyAddress = () => {
  return (
    <><div className="flex flex-col">
      <p className="text-white font-extrabold text-[28px]">CyfrowyDochód.pl</p>
      <div className="font-extrabold text-sm leading-8 text-slate-400 mt-4">
        <p>CyfrowyDochód sp.z.o.o</p>
        <p>Dolińska 16</p>
        <p>+48 77 00 000 00</p>
        <p>pomoc@cyfrowydochod.pl</p>
        <p>biznes@cyfrowydochod.pl</p>
      </div>
      </div>
    </>
  );
};
const Footer: FunctionComponent = () => {
  return (
    <div className="flex flex-col bg-slate-900 p-8 w-screen">
      <Wrapper>
        <div className="flex flex-col md:flex-row md:mb-32">
          <CompanyAddress />
          <img src="/MainLogoWhite.png" className="w-2/3 self-center my-8" alt="" />
        </div>
        <NavigationOptions />
        <div className="flex flex-row mt-4">
          <Instagram className="mr-4" color="#FFF" />
          <Facebook className="mr-4" color="#FFF" />{" "}
          <i className="fa-brands fa-x-twitter text-white text-2xl" />
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
