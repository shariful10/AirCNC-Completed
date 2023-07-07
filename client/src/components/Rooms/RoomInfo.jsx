import React from "react";

const RoomInfo = ({ roomData }) => {
	const { host, guests, bedrooms, bathrooms, description } = roomData;
	const { image, name } = host;

	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div className="text-xl font-semibold flex flex-row items-center gap-2">
					<div>Hosted by {name}</div>

					<img
						className="rounded-[100%] h-7 w-7"
						alt="Avatar"
						src={image}
					/>
				</div>
				<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
					<p className="font-normal">{guests} guests</p>
					<p className="font-normal">{bedrooms} rooms</p>
					<p className="font-normal">{bathrooms} bathrooms</p>
				</div>
			</div>

			<hr />
			<div className="text-lg font-normal text-neutral-500">{description}</div>
			<hr />
		</div>
	);
};

export default RoomInfo;
