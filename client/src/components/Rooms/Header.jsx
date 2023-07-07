import React from "react";
import Heading from "../Heading/Heading";

const Header = ({roomData}) => {
	const {title, location, image} = roomData;

	return (
		<>
			<Heading
				title={title}
				subtitle={location}
			/>
			<div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
				<img
					className="object-cover w-full"
					src={image}
					alt="Header Image"
				/>
			</div>
		</>
	);
};

export default Header;
