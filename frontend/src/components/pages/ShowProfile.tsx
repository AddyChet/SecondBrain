import React from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

const ShowProfile = () => {
    const {logout} = useAuthStore()
  return (
    <div className="shadow-lg absolute right-0 top-11 bg-white rounded-lg">
      <div className="flex gap-y-3 flex-col">
        <div className="cursor-pointer px-6 py-2 hover:text-button-600  hover:shadow-md hover:rounded-md  hover:border-gray-100">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
