import { RiArrowDropDownLine } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItemComponent: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  const contentHeight = useRef<HTMLDivElement>(null);
  const [contentMaxHeight, setContentMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (isOpen && contentHeight.current) {
      setContentMaxHeight(contentHeight.current.scrollHeight);
    } else {
      setContentMaxHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-solid border-black overflow-hidden">
      <button
        className={`w-full text-left p-4 flex items-center justify-between
         bg-transparent border-none cursor-pointer`}
        onClick={onClick}
      >
        <p className='font-semibold text-lg'>{question}</p>
        <RiArrowDropDownLine className={`text-3xl ${isOpen ? "transform rotate-180 text-green-500" : ""}`} />
      </button>

      <div
        ref={contentHeight}
        className="px-4 overflow-hidden"
        style={{
          maxHeight: contentMaxHeight + "px",
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        <p className="pb-4 text-md">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItemComponent;
