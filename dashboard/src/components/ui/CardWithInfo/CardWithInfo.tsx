import React, { ReactNode } from 'react';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Avatar from '@/components/ui/Avatar';
import {HiPlusCircle} from 'react-icons/hi'

interface CardWithInfoProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    // icon: ReactNode;
    // textData: {
    //     leadCount: number;
    //     leadText: string;
    //     tagText: string;
    //     subTagText:string;
    // };
    // tagIcon?: ReactNode;
    title: string;
    heading: string;
}

const CardWithInfo: React.FC<CardWithInfoProps> = ({
    onClick,
    title,
    heading
    // icon,
    // textData,
    // tagIcon,
}) => {
    // const { leadCount, leadText, tagText ,subTagText} = textData;

    return (
        <Card
            clickable
            className="hover:shadow-lg transition duration-150 ease-in-out bg-[#F5F5F5]"
            onClick={onClick}
        >
            {/* <div className="flex items-center gap-4 bg-[#F5F5F5]"> */}
                {/* <Avatar className="mr-4 bg-emerald-500" icon={icon} /> */}
                {/* <div> */}
                    <div className="">
                        <h2 className="font-bold leading-none ">{title}</h2>
                        
                        <p className="font-semibold mt-[10px] text-[15px]">{heading}</p>
                    </div>
                    {/* <p className="flex text-base items-center gap-1">
                        <span className="flex items-center rounded-full gap-1">
                            <Tag prefix={tagIcon || <HiPlusCircle className="text-base text-blue-500 mr-1 rtl:ml-1" /> }>
                                {tagText}
                            </Tag>
                        </span>
                        <span>{subTagText}</span>
                    </p> */}
                   
                {/* </div> */}
            {/* </div> */}
        </Card>
    );
};

export default CardWithInfo;
