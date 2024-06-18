import { CalendarCheck } from "lucide-react";
import { Button } from "../../button";
import { ReactNode } from "react";
import { HeroBookType } from "@/types";

type OrderCardProps = {
  order: HeroBookType;
};

function OrderCard({ order }: OrderCardProps): ReactNode {
  return (
    <div className="bg-[#FBFBFB] md:rounded-xl  my-8 p-4 shadow-lg ">
      <div className="flex flex-row">
        <img src={order.imagePath} className=" w-36 rounded-xl" alt="" />
        <div className="flex flex-col ml-2">
          <p className="font-semibold">{order.title}</p>
          <p className="text-slate-500">by {order.author}</p>

          <div className="flex flex-row items-center">
            <CalendarCheck size={16} />
            <p className="ml-2">Bought on 12.24.2023</p>
          </div>
          <Button className="self-center w-fit mt-8">Download eBook</Button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
