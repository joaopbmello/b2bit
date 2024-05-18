import B2BitLogo from "../assets/B2Bit Logo.png";
import "../styles/SignIn.css";

const SignIn = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle shadow p-3 signin">
      <div className="d-flex justify-content-center m-4">
        <img src={B2BitLogo} alt="B2Bit Logo" className="w-100" />
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="form-control opacity-75"
            placeholder="@gmail.com"
          />
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
          />
        </div>
        <button type="submit" className="btn btn-primary p-2 w-100">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
