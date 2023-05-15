import { ChangeEvent, useEffect, useMemo, useState } from "react";

export const useForm = <T>(
  initialForm: { [key: string]: string } = {}, 
  formValidations: { [key: string]: [(value: string) => boolean, string] } = {}) => {

  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState<{[key: string]: string | null}>({});

  useEffect(() => {
    createValidators();  
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if( formValidation[formValue] !== null ) return false;
    }
    return true;
  }, [formValidation])
  

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState, [name]: value
    })
  }

  const onResetForm = (() => {
    setFormState(initialForm);
  });

  const createValidators = () => {
    const formCheckedValues: {[key: string]: string | null} = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  }

  return {
    ...(formState as T),
    formState: (formState as T),
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  };
}
