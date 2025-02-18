
export interface SignupValues {
    name: string;
    email: string;
    password: String;
    confirmPassword: string;
}

export interface LoginValues {
    username: string;
    password: String;
}

export interface AuthHeader {
    method: string,
    headers: {
        'Authorization'?: string,
        'Content-Type': string,
    },
    body?: string,
}