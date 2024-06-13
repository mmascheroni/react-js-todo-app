import { useState } from 'react';

const useForm = (initialValue = {}) => {
    const [formState, setFormState] = useState(initialValue);

    const onChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialValue);
    };

    return {
        ...formState,
        formState,
        onChange,
        onResetForm,
    };
};

export default useForm;
