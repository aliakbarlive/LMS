import React, { ReactNode } from 'react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Progress from '@/components/ui/Progress'

interface CardWithInfoProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    icon: ReactNode;
    textDataCourse: {
        numbers: number;
        percent: number;
        text: string;
    };
}

const CourseCardInfoHome: React.FC<CardWithInfoProps> = ({
    onClick,
    icon,
    textDataCourse,
}) => {
    const { text,percent,numbers} = textDataCourse;

    return (
        <Card
            clickable
            className="hover:shadow-lg transition duration-150 ease-in-out"
            onClick={onClick}
        >
            <div className="flex  mb-2 items-center  justify-between  gap-4">
                    <div className='flex items-center  justify-between  gap-4'>
                        <Avatar className=" bg-emerald-500" icon={icon} />
                        <p className="font-semibold">{text}</p>
                    </div>
                    <h3 className='py-2 '>{numbers}</h3>
            </div>
            <Progress percent={percent} />
        </Card>
    );
};

export default CourseCardInfoHome;
