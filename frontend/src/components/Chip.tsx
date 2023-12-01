import React from 'react';

interface IChipProps {
    label: string,
    color?: string,
    textColor?: string,
}

const Chip: React.FC<IChipProps> = ({
    label,
    color = 'bg-gray-200',
    textColor = 'text-gray-800',
}) => {
    return (
        <div
            className={`w-fit h-fit text-xs italic font-extralight rounded-full px-2 py-1 whitespace-nowrap ${color} ${textColor}`}
        >{label}</div>
    )
}

export default Chip