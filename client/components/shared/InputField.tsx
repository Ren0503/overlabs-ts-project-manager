import { useField } from 'formik';
import React, { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes } from 'react'

type InputFieldProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label: string;
    name: string;
};

const InputField: FunctionComponent<InputFieldProps> = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <div className='my-3'>
            <label className='form-label' htmlFor={props.name}>
                {label}
            </label>
            <input className='form-field' {...field} id={props.name} {...props} />
        </div>
    );
};

export default InputField;
