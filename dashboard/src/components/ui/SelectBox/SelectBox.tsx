import { forwardRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import CreatableSelect from 'react-select/creatable';
import { useForm } from 'react-hook-form';
interface SelectProps {
    size?: 'sm' | 'md' | 'lg';
    field?: any;
    form?: any;
    options: { value: string; label: string }[];
    isMulti?: boolean;
    value?: string[];
    datatype:string;
    onChange?: (selectedOptions: string[],datatype:string) => void;
}

const SelectBox = forwardRef<any, SelectProps>(
    ({ size = 'md', field, datatype,form, options, isMulti = false ,onChange }, ref) => {
        const { setValue } = useForm();
        const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

        useEffect(() => {
            if (field && field.value) {
                setSelectedOptions(field.value);
            }
        }, [field]);

        const handleChange = (selectedOptions: any) => {
            setSelectedOptions(selectedOptions);
            if (field) {
                setValue(field.name, selectedOptions);
            }
            if (onChange) {
                onChange(selectedOptions,datatype); 
            }
        };
        
        

        const selectClass = classNames(
            'select',
            `select-${size}`,
            form && form.errors[field.name] && 'input-invalid'
        );
        

        return (
            <div className="sm:max-w-[550px] w-[90vw]">
                <CreatableSelect
                ref={ref}
                className={selectClass}
                classNamePrefix={'select'}
                options={options}
                isMulti={isMulti}
                value={selectedOptions}
                onChange={handleChange}
            />
            </div>
        );
    }
);

export default SelectBox;
