import "../styles/Profile.css";

const usuario = {
  avatar: {
    image_low_url:
      "https://cognuro-app-assets.s3.amazonaws.com/media/images/IMG_4452_low_5Vh2hYj.jpg",
  },
  name: "Miguel",
  last_name: "Rocha",
  email: "miguel@b2bit.company",
};

interface User {
  avatar: {
    image_low_url: string;
  };
  name: string;
  last_name: string;
  email: string;
}

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  user = usuario;

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle shadow-sm p-3 profile">
        <div className="d-flex justify-content-center flex-column mb-4">
          <p className="mx-auto">Profile picture</p>
          <img src={user.avatar.image_low_url} className="mx-auto" />
        </div>
        <div>
          <p>
            Your <b>Name</b>
          </p>
          <input
            id="name"
            type="text"
            value={user.name + " " + user.last_name}
            readOnly
          />
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
