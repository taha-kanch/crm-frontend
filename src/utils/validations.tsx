import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
});

export const signupSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
        )
        .matches(
            /[a-z]/,
            "Password must contain at least one lowercase letter"
        )
        .matches(
            /\d/,
            "Password must contain at least one number"
        )
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        )
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});