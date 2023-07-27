import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER_REGEX, VALIDATION_MESSAGES } from '../../../utils/constants';
import { DEFAULT_ERROR_DATA } from './constants';
import { FormErrorsInterface, RegisterFormDataInterface } from './types';

export const getRegisterRequestBody = (formData: RegisterFormDataInterface) => {
    const requestBody = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
    };
    return requestBody;
};

export const getValidCheck = (
    value: any,
    formData: RegisterFormDataInterface,
    id: string,
    formErrors: FormErrorsInterface,
) => {
    let errorData = formErrors;
    switch (id) {
        case 'email':
            if (value) {
                if (!EMAIL_REGEX.test(value)) {
                    errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.email } };
                } else {
                    errorData = { ...errorData, [id]: { error: false, message: '' } };
                }
            } else {
                errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } };
            }

            break;
        case 'phone_number':
            if (value) {
                if (value.length < 10 || value.length > 10) {
                    errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.phone } };
                } else {
                    errorData = { ...errorData, [id]: { error: false, message: '' } };
                }
            } else {
                errorData = { ...errorData, [id]: { error: false, message: '' } };
            }
            break;
        case 'password':
            if (value) {
                if (!PASSWORD_REGEX.test(value)) {
                    errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.password } };
                } else {
                    errorData = { ...errorData, [id]: { error: false, message: '' } };
                }
            } else {
                errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } };
            }
            break;
        case 'confirmPassword':
            if (value) {
                if (!PASSWORD_REGEX.test(value)) {
                    errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.password } };
                } else {
                    errorData = { ...errorData, [id]: { error: false, message: '' } };
                }
                if (formData.password !== value) {
                    errorData = {
                        ...errorData,
                        [id]: { error: true, message: VALIDATION_MESSAGES.confirmPassword },
                    };
                } else {
                    errorData = { ...errorData, [id]: { error: false, message: '' } };
                }
            } else {
                errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } };
            }
            break;
        case 'firstName':
        case 'lastName':
            if (!value) {
                errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } };
            } else {
                errorData = { ...errorData, [id]: { error: false, message: '' } };
            }
            break;
        default:
            errorData = errorData;
    }
    return errorData;
};

export const getDisabledState = (formErrors: FormErrorsInterface, formData: RegisterFormDataInterface) => {
    let flag = true;
    if (formData.email && formData.confirmPassword && formData.password && formData.firstName && formData.lastName) {
        flag = false;
    }
    const errorData = Object.entries(formErrors);
    for (let i = 0; i < errorData.length; i++) {
        if (errorData[i][1].error) {
            flag = true;
            break;
        }
    }
    return flag;
};
