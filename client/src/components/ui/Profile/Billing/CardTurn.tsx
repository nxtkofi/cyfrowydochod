import { EyeIcon, EyeOff } from "lucide-react";

function CardTurn() {
  return (
    <div className="flex flex-col absolute text-black items-center -top-[108px] -right-16">
      <p className="mt-16 font-semibold self-end mb-2 ">Show card details</p>
    <div className=" w-6 h-6 bg-gray-300 border-2 border-slate-500 rounded-full justify-center flex items-center">
      <EyeIcon className="" color="#64747B" size={18}/>
    </div>
    </div>
  );
}

export default CardTurn;
