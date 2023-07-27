import { EMAIL_REGEX, PASSWORD_REGEX, VALIDATION_MESSAGES } from '../../utils/constants';
import { LoginFormErrorsInterface, LoginPayloadInterface } from './types';

export const validationCheck = (data: LoginPayloadInterface, errors: LoginFormErrorsInterface) => {
    let errorData = errors;
    if (!EMAIL_REGEX.test(data.email)) {
        errorData = { ...errorData, email: { error: true, message: VALIDATION_MESSAGES.email } };
    }
    if (!PASSWORD_REGEX.test(data.password)) {
        errorData = {
            ...errorData,
            password: {
                error: true,
                message: VALIDATION_MESSAGES.password,
            },
        };
    }
    return errorData;
};

export const validationCheckDisabled = (errors: {
    email: { error: boolean; message: string };
    password: { error: boolean; message: string };
}) => {
    if (errors.email.error) {
        return true;
    }
    if (errors.password.error) {
        return true;
    }
    return false;
};
