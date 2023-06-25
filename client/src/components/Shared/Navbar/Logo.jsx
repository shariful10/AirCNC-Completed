import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/images/logo.png";

const Logo = () => {
	return (
		<Link to="/">
			<img className="w-[100px] h-auto hidden md:block" src={logoImg} alt="Logo" />
		</Link>
	);
};

export default Logo;
