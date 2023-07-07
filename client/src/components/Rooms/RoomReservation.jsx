import React, { useState } from "react";
import Calender from "./Calender";
import Button from "../Button/Button";
import useAuth from "../Hooks/useAuth";
import BookingModal from "../Modal/BookingModal";
import { formatDistance } from "date-fns";

const RoomReservation = ({ roomData }) => {
	const { user, role } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	// Price Calculations
	const totalPrice =
		parseFloat(formatDistance(new Date(roomData.to), new Date(roomData.from)).split(" ")[0]) *
		roomData.price;
	const [value, setValue] = useState({
		startDate: new Date(roomData.from),
		endDate: new Date(roomData.to),
		key: "selection",
	});

	// Booking State
	const [bookingInfo, setBookingInfo] = useState({
		guest: { name: user.displayName, email: user.email, image: user.photoURL },
		host: roomData.host.email,
		location: roomData.location,
		price: totalPrice,
		to: value.endDate,
		from: value.startDate,
		title: roomData.title,
	});

	const handleSelect = (ranges) => {
		setValue({ ...value });
	};

	const modalHandler = () => {
		console.log(" ");
	};

	return (
		<div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
			<div className="flex flex-row items-center gap-1 p-4">
				<div className="text-2xl font-semibold">${roomData.price}</div>
				<div className="font-normal text-neutral-600">Night</div>
			</div>
			<hr />
			<div className="flex justify-center">
				<Calender value={value} handleSelect={handleSelect} />
			</div>
			<hr />
			<div className="p-4">
				<Button
					onClick={() => setIsOpen(true)}
					disabled={roomData.host.email === user.email}
					label="Reserve"
				/>
			</div>
			<hr />
			<div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
				<div>Total</div>
				<div>${totalPrice}</div>
			</div>
			<BookingModal
				isOpen={isOpen}
				bookingInfo={bookingInfo}
				modalHandler={modalHandler}
				closeModal={closeModal}
			/>
		</div>
	);
};

export default RoomReservation;
