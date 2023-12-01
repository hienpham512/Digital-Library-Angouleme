import { Icon } from '@iconify/react';

export interface IDropdownProps {
    options: {
        key: string;
        label: string;
        icon?: string;
    }[];
    isShown: boolean;
    setIsShown: (isShown: boolean) => void;
    handleSelect: (key: number) => void;
    className?: string;
}

const Dropdown: React.FC<IDropdownProps> = ({
    options,
    isShown,
    setIsShown,
    handleSelect,
    className,
}) => {
    if (!isShown) return null;

    const handleSelectOption = (key: number) => {
        setIsShown(false);
        handleSelect(key);
    };

    return (<div className={`absolute z-50 border bg-white p-2 rounded-md shadow-xl mt-2 ${className ? className : ''}`}>
        {options.map((option, index) => (
            <div
                onClick={() => handleSelectOption(index)}
                key={index} className="flex items-center gap-2 shadow-md p-2 font-normal hover:underline hover:scale-105 duration-300 ease-in-out cursor-pointer whitespace-nowrap border-b">
                {
                    option.icon &&

                    <Icon icon={option.icon} width="1rem" height="1rem" />
                }
                <span>
                    {option.label}
                </span>
            </div>
        ))}

    </div>);
}

export default Dropdown;