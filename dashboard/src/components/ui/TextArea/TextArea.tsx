import { forwardRef, useState, useEffect, useMemo ,useRef} from 'react';
import classNames from 'classnames';
import { useConfig } from '../ConfigProvider';
import { useForm } from '../Form/context';
import { useInputGroup } from '../InputGroup/context';
import { CONTROL_SIZES } from '../utils/constants';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import type { CommonProps, TypeAttributes } from '../@types/common';
import type { ElementType, ReactNode } from 'react';

interface TextAreaProps extends CommonProps {
    className?: string;
    disabled?: boolean;
    invalid?: boolean;
    prefix?: string | ReactNode;
    size?: TypeAttributes.ControlSize;
    suffix?: string | ReactNode;
    unstyle?: boolean;
    field?: any;
    form?: any;
    rows?: number;
    maxLength?: number;
    placeholder?: string;
    type?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
        const {
            className,
            disabled,
            invalid,
            prefix,
            size,
            suffix,
            unstyle = false,
            field,
            form,
            rows = 10, // Default to 10 rows
            maxLength,
            ...rest
        } = props;

        const [prefixGutter, setPrefixGutter] = useState(0);
        const [suffixGutter, setSuffixGutter] = useState(0);

        const { themeColor, controlSize, primaryColorLevel, direction } =
            useConfig();
        const formControlSize = useForm()?.size;
        const inputGroupSize = useInputGroup()?.size;

        const inputSize = size || inputGroupSize || formControlSize || controlSize;

        const isInvalid = useMemo(() => {
            let validate = false;
            if (!isEmpty(form)) {
                const { touched, errors } = form;
                const touchedField = get(touched, field.name);
                const errorField = get(errors, field.name);
                validate = touchedField && errorField;
            }
            if (typeof invalid === 'boolean') {
                validate = invalid;
            }
            return validate;
        }, [form, invalid, field]);

        const inputDefaultClass = 'input';
        const inputSizeClass = `input-${inputSize}}`;
        const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
        const inputWrapperClass = `input-wrapper ${
            prefix || suffix ? className : ''
        }`;
        const inputClass = classNames(
            inputDefaultClass,
            inputSizeClass,
            !isInvalid && inputFocusClass,
            !prefix && !suffix ? className : '',
            disabled && 'input-disabled',
            isInvalid && 'input-invalid'
        );

        const prefixNode = useRef<HTMLDivElement>(null);
        const suffixNode = useRef<HTMLDivElement>(null);

        const getAffixSize = () => {
            if (!prefixNode.current && !suffixNode.current) {
                return;
            }
            const prefixNodeWidth = prefixNode?.current?.offsetWidth;
            const suffixNodeWidth = suffixNode?.current?.offsetWidth;

            if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
                return;
            }

            if (prefixNodeWidth) {
                setPrefixGutter(prefixNodeWidth);
            }

            if (suffixNodeWidth) {
                setSuffixGutter(suffixNodeWidth);
            }
        };

        useEffect(() => {
            getAffixSize();
        }, [prefix, suffix]);

        const remToPxConvertion = (pixel: number) => 0.0625 * pixel;

        const affixGutterStyle = () => {
            const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`;
            const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`;
            const gutterStyle: {
                paddingLeft?: string;
                paddingRight?: string;
            } = {};

            if (direction === 'ltr') {
                if (prefix) {
                    gutterStyle.paddingLeft = leftGutter;
                }

                if (suffix) {
                    gutterStyle.paddingRight = rightGutter;
                }
            }

            if (direction === 'rtl') {
                if (prefix) {
                    gutterStyle.paddingRight = leftGutter;
                }

                if (suffix) {
                    gutterStyle.paddingLeft = rightGutter;
                }
            }

            return gutterStyle;
        };

        const inputProps = {
            className: !unstyle ? inputClass : '',
            disabled,
            rows,
            ref,
            ...field,
            ...rest,
        };

        return (
            <textarea
            style={{ ...affixGutterStyle(), ...rest.style }}
            {...inputProps}
            rows={rows} 
        />
        );
    }
);

TextArea.displayName = 'TextArea';

export default TextArea;
