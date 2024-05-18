import { useFormik } from "formik";
import B2BitLogo from "../assets/B2Bit Logo.png";
import "../styles/SignIn.css";
import axios from "axios";

const validate = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};

  if (!values.email) {
    errors.email = "Please enter an email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Please enter your password";
  }

  return errors;
};

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      axios
        .post(
          "https://api.homologation.cliqdrive.com.br/auth/login/",
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              Accept: "application/json;version=v1_web",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => console.log(response));
    },
  });

  return (
    <div className="position-absolute top-50 start-50 translate-middle shadow p-3 signin">
      <div className="d-flex justify-content-center m-4">
        <img src={B2BitLogo} alt="B2Bit Logo" className="w-100" />
      </div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="form-control opacity-75"
            placeholder="@gmail.com"
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="text-danger mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control opacity-75"
            placeholder="****************"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <p className="text-danger mt-1">{formik.errors.password}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary p-2 w-100">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
