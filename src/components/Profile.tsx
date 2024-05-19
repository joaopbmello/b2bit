import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  avatar: {
    medium: string;
  };
}

export default function Profile() {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;version=v1_web",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  if (user)
    return (
      <>
        <div className="position-absolute top-50 start-50 translate-middle shadow-sm p-3 profile">
          <div className="d-flex justify-content-center flex-column mb-4">
            <p className="mx-auto">Profile picture</p>
            <img
              src={user.avatar.medium}
              alt="User profile picture"
              className="mx-auto"
            />
          </div>
          <div>
            <p>
              Your <b>Name</b>
            </p>
            <input id="name" type="text" value={user.name} readOnly />
          </div>
          <div>
            <p>
              Your <b>E-mail</b>
            </p>
            <input id="name" type="email" value={user.email} readOnly />
          </div>
        </div>
        <button className="btn btn-primary position-absolute top-0 end-0 m-3">
          Logout
        </button>
      </>
    );
}
