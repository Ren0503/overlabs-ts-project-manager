import { useField } from 'formik';
import React, { DetailedHTMLProps, FunctionComponent, TextareaHTMLAttributes } from 'react';

type TextFieldProps = DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    label: string;
    name: string;
};

const TextField: FunctionComponent<TextFieldProps> = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <div className='my-3'>
            <label className='form-label' htmlFor={props.name}>
                {label}
            </label>
            <textarea className='form-field' {...field} id={props.name} {...props} />
        </div>
    );
};

export default TextField;
