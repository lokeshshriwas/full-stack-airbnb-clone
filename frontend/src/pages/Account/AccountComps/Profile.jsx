import React from "react";

const Profile = ({user, handleLogout}) => {
  return (
    <div className="text-center max-m-lg mx-auto my-6">
      Logged in as {user.username} ({user.email}) <br />
      <button
        className="bg-primary mx-w-sm text-white px-4 py-2 rounded-full mt-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
