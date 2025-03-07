import useBooks from "@/hooks/useBooks";
import { useEffect, useState } from "react";

 type gradientType = {
  gradient: string;
  id: string;
};
type parsedGradientType ={
  stopColor:string;
  offset:string;
}
function parseGradient(gradient: string) {
  const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)\s(\d+)%/gi;
  let match;
  const stops = [];
  while ((match = regex.exec(gradient)) !== null) {
    const [_, r, g, b, a, offset] = match;
    const color = a ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`;
    stops.push({ stopColor: color, offset: `${offset}%` });
  }
  return stops;
}

function Gradients() {
  const [gradients, setGradients] = useState<gradientType[] | null>(null);
  const [parsedGradients, setParsedGradients] = useState<parsedGradientType[][] | null>(null);
  const { books } = useBooks();
  useEffect(() => {
    if (books) {
      const gradientsArray = books.map((book) => {
        return { id: book.id, gradient: book.gradient };
      });
      setGradients(gradientsArray);
    }
  }, [books]);

  useEffect(() => {
    if (gradients) {
      const parsed = gradients.map((element) =>
        parseGradient(element.gradient)
      );
      setParsedGradients(parsed);
    }
  }, [gradients]);

  useEffect(() => {
    console.log(parsedGradients);
    console.log(gradients);
  }, [books,gradients]);
  return (
    <>
      {parsedGradients &&
        parsedGradients.map((stops, index) => (
          <svg key={index} width="0" height="0">
            <linearGradient
              id={`gradient-${gradients![index].id}`}
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              {stops.map((stop, stopIndex) => (
                <stop
                  key={stopIndex}
                  stopColor={stop.stopColor}
                  offset={stop.offset}
                />
              ))}
            </linearGradient>
          </svg>
        ))}
    </>
  );
}

export default Gradients;
