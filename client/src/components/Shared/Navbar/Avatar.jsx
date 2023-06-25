import React from "react";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useAuth from "../../Hooks/useAuth";

const Avatar = () => {
	const { user } = useAuth();

	return (
		<img
			className="h-7 w-7 rounded-full"
			src={user?.photoURL ? user.photoURL : avatarImg}
			alt="Profile"
		/>
	);
};

export default Avatar;
