import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";

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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        logout();
      });
  }, []);

  if (user)
    return (
      <>
        <nav className="flex justify-end items-center h-18 bg-white">
          <button
            className="btn p-2.5 mr-9 w-68 text-base rounded-md"
            onClick={logout}
          >
            Logout
          </button>
        </nav>
        <div className="flex justify-center h-screen bg-sky-50">
          <div className="mt-24 sm:w-88 h-min bg-white rounded-2xl shadow-full-md">
            <div className="grid sm:mx-35 mx-30 my-8 size-max">
              <p className="mb-2 text-xs">Profile picture</p>
              <img
                src={user.avatar.medium}
                alt="User profile picture"
                className="object-cover justify-self-center size-14 rounded-lg"
              />
            </div>
            <div className="mx-7 mb-5">
              <label className="label text-sm">
                Your <span className="font-bold">Name</span>
              </label>
              <input
                id="name"
                type="text"
                value={user.name}
                className="input input-profile"
                readOnly
              />
            </div>
            <div className="mx-7 mb-7">
              <label className="label text-sm">
                Your <span className="font-bold">E-mail</span>
              </label>
              <input
                id="name"
                type="email"
                value={user.email}
                className="input input-profile"
                readOnly
              />
            </div>
          </div>
        </div>
      </>
    );
}
