import { useState } from "react";
import  { AccordionItem } from "./AccordionDataInterface";
import AccordionItemComponent from "../According/AccordionItemComponent"

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="mx-auto max-w-2xl py-16 px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {items.map((item) => (
        <AccordionItemComponent
          key={item.key}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === item.key}
          onClick={() => handleItemClick(item.key)}
        />
      ))}
    </div>
  );
};




export default Accordion;
