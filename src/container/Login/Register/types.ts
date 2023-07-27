import { FormErrors } from "../../../utils/types";

export interface RegisterFormDataInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone_number: string;
}

export interface FormErrorsInterface {
    firstName: FormErrors,
    lastName: FormErrors,
    email: FormErrors,
    phone_number: FormErrors,
    confirmPassword: FormErrors,
    password: FormErrors
}

