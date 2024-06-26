import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import B2BitLogo from "../assets/B2Bit Logo.png";
import apiClient from "../services/api-client";

interface FormValues {
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = "Please enter an e-mail address.";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Please enter a valid e-mail address.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
};

export default function SignIn() {
  const [error, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      apiClient
        .post("/login/", {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.tokens.access);
          navigate("/profile");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400)
            setErrors("Please enter your email and password.");
          else if (error.response && error.response.status === 401)
            setErrors("Invalid email or password. Please try again.");
          else setErrors("An error occurred. Please try again.");
        });
    },
  });

  return (
    <div className="grid place-content-center h-screen">
      <div className="sm:w-112 h-max text-lg rounded-2xl shadow-full-lg">
        <div>
          <img src={B2BitLogo} alt="B2Bit Logo" className="px-16 pt-16 pb-11" />
        </div>
        <form onSubmit={formik.handleSubmit} className="mx-6" noValidate>
          <div className="mb-7">
            <label htmlFor="email" className="label font-bold">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="input input-signin"
              placeholder="@gmail.com"
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <p className="error">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="label font-bold">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formik.values.password}
              className="input input-signin"
              placeholder="****************"
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className={`btn p-3.5 mt-9 ${
              error ? "" : "mb-10"
            } w-full rounded-lg`}
          >
            Sign In
          </button>
          {error && <p className="error mb-10">{error}</p>}
        </form>
      </div>
    </div>
  );
}
