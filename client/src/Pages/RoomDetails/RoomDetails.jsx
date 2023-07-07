import React from "react";
import Header from "../../components/Rooms/Header";
import RoomInfo from "./../../components/Rooms/RoomInfo";
import RoomReservation from "../../components/Rooms/RoomReservation";
import { useLoaderData } from "react-router-dom";

const RoomDetails = () => {
	const roomData = useLoaderData();

	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="flex flex-col gap-6 pt-28">
				<Header roomData={roomData} />
				<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10">
					<RoomInfo roomData={roomData} />
					<div className="mb-10 md:col-span-3 order-first md:order-last">
						<RoomReservation roomData={roomData} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomDetails;
