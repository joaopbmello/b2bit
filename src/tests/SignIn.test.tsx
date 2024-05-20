import { expect, test } from "vitest";
import { validate } from "../components/SignIn";

test("should return error message for empty email", () => {
  expect(validate({ email: "", password: "password" })).toStrictEqual({
    email: "Please enter an e-mail address.",
  });
});

test("should return error message for empty password", () => {
  expect(validate({ email: "test@example.com", password: "" })).toStrictEqual({
    password: "Please enter your password.",
  });
});

test("should return error messages for empty email and password", () => {
  expect(validate({ email: "", password: "" })).toStrictEqual({
    email: "Please enter an e-mail address.",
    password: "Please enter your password.",
  });
});

test("should return error message for invalid email", () => {
  expect(validate({ email: "invalid", password: "password" })).toStrictEqual({
    email: "Please enter a valid e-mail address.",
  });
});

test("should return no error messages for valid email and password", () => {
  expect(
    validate({ email: "test@example.com", password: "password" })
  ).toStrictEqual({});
});
