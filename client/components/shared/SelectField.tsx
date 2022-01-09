import { useField } from 'formik';
import React, { DetailedHTMLProps, FunctionComponent, SelectHTMLAttributes } from 'react'

type SelectFieldProps = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
> & {
    label: string;
    name: string;
};

const SelectField: FunctionComponent<SelectFieldProps> = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <div className='my-3'>
            <label className='form-label' htmlFor={props.name}>
                {label}
            </label>
            <select className='form-field' {...field} id={props.name} {...props} />
        </div>
    );
};

export default SelectField;
