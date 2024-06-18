import { Button } from "../../button";
import CardDesign from "./CardDesign";
import CardTurn from "./CardTurn";

function CardElement() {
  return (
    <>  
      
      <div className=" mt-24 relative flex w-64 h-40 bg-[#4DC9D1] rounded-xl self-center text-white">        
      <CardTurn/>
        <CardDesign className="mt-12" />
        <div className="flex flex-col">
          <div className="mt-8 -ml-6">**** **** **** 3254</div>
          <div className="flex flex-row justify-between mt-12">
            <div className="flex flex-col -ml-12 text-center">
              <p>MM/RR</p>
              <p>02/29</p>
            </div>
            <div className="flex flex-col text-center">
              <p>CVV/CVC</p>
              <p>***</p>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-fit mt-8 self-center">Edit card</Button>{" "}
    </>
  );
}

export default CardElement;
