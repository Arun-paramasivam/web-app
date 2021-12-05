import { useFormik } from "formik";
import * as yup from 'yup'
export const BasicForm = (props) => {
    const formValidate = (values) => {
        // console.log('formValidate', values)
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }

        if (values.password.length < 8) {
            errors.password = 'Please enter longer password'
        }

        console.log('errors', errors)
        return errors;
    }

    const formValidationSchema = yup.object({
        email: yup
        .string()
        .min(5, 'need bigger mail')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'enter valid email')
        .required(),
        password: yup
        .string()
        .min(8, 'need bigger password')
        .max(12, 'need smaller password')
        .required()
    })

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        // validate: formValidate,
        validationSchema: formValidationSchema,
        onSubmit: values => {
            console.log('submit', values)
        }
    })
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = formik
    const { email, password } = values
    return <form onSubmit={handleSubmit}>
        <input
            id="email"
            type="email"
            value={email}
            onBlur={handleBlur}
            placeholder='Enter email'
            onChange={handleChange}
        />
        {errors.email && touched ? errors.email : ''}
        <input
            id="password"
            type='password'
            value={password}
            onBlur={handleBlur}
            placeholder='Enter password'
            onChange={handleChange} />
        {errors.password && touched ? errors.password : ''}
        <button type="submit">submit</button>
    </form>;
};
