import { Facebook, Instagram } from "lucide-react";
import { FunctionComponent } from "react";


const NavigationOptions = () => {
    return (<div className="flex self-center flex-row text-white text-base font-extrabold leading-[4rem]">
        <div className="flex-col">
            <p>Home</p>
            <p>All eBooks</p>
            <p>Contact</p>
        </div>
        <div className="flex-cold ml-16">
            <p>Login/Register</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
        </div>
    </div>);
}

<NavigationOptions/>
const CompanyAddress = () => {
  return (<><p className="text-white font-extrabold text-[28px]">CyfrowyDochód.pl</p>
  <div className="font-extrabold text-sm leading-8 text-slate-400 mt-4">
  <p>CyfrowyDochód sp.z.o.o</p>
  <p>Dolińska 16</p>
  <p>+48 77 00 000 00</p>
  <p>pomoc@cyfrowydochod.pl</p>
  <p>biznes@cyfrowydochod.pl</p>
  </div></>
);
};
const Footer: FunctionComponent = () => {
  return (
    <div className="flex flex-col bg-slate-900 p-4 w-screen">
      <CompanyAddress />
      <img src="/MainLogoWhite.png" className="w-2/3 self-center" alt="" />
      <NavigationOptions/>
      <div className="flex flex-row">
        <Instagram /><Facebook/> <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
      </div>
    </div>
  );
};

export default Footer;
