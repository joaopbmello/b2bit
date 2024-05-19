import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { redirect, useNavigate } from "react-router-dom";
import B2BitLogo from "../assets/B2Bit Logo.png";
import "../styles/SignIn.css";
import apiClient from "../services/api-client";

interface FormValues {
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validate = (values: FormValues) => {
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
        .post(
          "/login/",
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
        .then((response) => {
          localStorage.setItem("token", response.data.tokens.access);
          navigate("/profile");
        })
        .catch((error) => {
          if (error.response && error.response.status === 401)
            setErrors("Invalid email or password. Please try again.");
          else setErrors("An error occurred. Please try again.");
        });
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
            value={formik.values.password}
            className="form-control opacity-75"
            placeholder="****************"
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className="text-danger mt-1">{formik.errors.password}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary p-2 w-100">
          Sign In
        </button>
        {error && <p className="text-danger mt-1">{error}</p>}
      </form>
    </div>
  );
}
