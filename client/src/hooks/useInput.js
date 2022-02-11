import { useState } from 'react';

export const useInput = ({label = '', type = 'text', validation, name}) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(null);

  const validate = (value, validation) => {
    let valid = true;
    let error = null;

    if (validation.required) {
      valid = valid && value;
      error = !valid && !error ? new Error(`This field is required`) : error;
    }

    if (validation.isEmail) {
      valid = valid && value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); 
      error = !valid && !error ? new Error(`Type a right email`) : error;
    }

    if (validation.minLength) {
      valid = valid && value.length >= validation.minLength;
      error = !valid && !error ? new Error(`Min length is ${validation.minLength} symbols`) : error;
    }

    if (validation.maxLength) {
      valid = valid && value.length <= validation.maxLength;
      error = !valid && !error ? new Error(`Max length is ${validation.maxLength} symbols`) : error;
    }

    setError(error);
    return valid;
  }

  const onChange = (event) => {
    setValue(event.target.value);

    const isValid = !!validate(event.target.value, validation);
    setIsValid(isValid);
  };

  const onBlur = () => {
    setTouched(true);
  }
  
  const reset = () => {
    setIsValid(false);
    setValue('');
    setTouched(false);
    setError(null);
  }

  return {
    label, name, isValid,
    error, value, reset,
    spread: {
      value, label, type, onChange, onBlur,
      className: isValid && touched ? 'valid' : !isValid && touched ? 'invalid' : ''
    }
  };
};
