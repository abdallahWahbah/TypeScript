namespace App
{
    export interface Validatable
    {
        value: string | number;
        required?: boolean;
        minLength?: number; // length of the string, "?" optional property
        maxLength?: number;
        min?: number; // min is a value of number
        max?: number;
    }
    
    export const validate = (validatableInput: Validatable ) =>
    {
        let isValid = true;
        if(validatableInput.required)
        {
            isValid = isValid && (validatableInput.value.toString().trim().length !== 0);
        }
        if(typeof validatableInput.value === "string" && validatableInput.minLength != null)
        {
            isValid = isValid && (validatableInput.value.length >= validatableInput.minLength);
        }
        if(typeof validatableInput.value === "string" && validatableInput.maxLength != null)
        {
            isValid = isValid && (validatableInput.value.length <= validatableInput.maxLength);
        }
        if(typeof validatableInput.value === "number" && validatableInput.min != null)
        {
            isValid = isValid && (validatableInput.value >= validatableInput.min);
        }
        if(typeof validatableInput.value === "number" && validatableInput.max != null)
        {
            isValid = isValid && (validatableInput.value <= validatableInput.max);
        }
        return isValid; 
    }
}