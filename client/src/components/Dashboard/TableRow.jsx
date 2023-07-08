import React, { useState } from "react";
import { format } from "date-fns";
import DeleteModal from "../Modal/DeleteModal";
import { deleteBooking, updateStatus } from "../../API/Booking";
import { toast } from "react-hot-toast";

const TableRow = ({ booking, fetchBookings }) => {
	const { image, title, location, price, from, to } = booking;
	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	const modalHandler = (id) => {
		deleteBooking(id).then((data) => {
			console.log(data);
			updateStatus(booking.roomId, false).then((data) => {
				console.log(data);
				fetchBookings();
				toast.success("Booking Cancelled");
			});
		});
		closeModal();
	};

	return (
		<tr>
			<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<div className="flex items-center">
					<div className="flex-shrink-0">
						<div className="block relative">
							<img
								alt="profile"
								src={image}
								className="mx-auto object-cover rounded h-10 w-15 "
							/>
						</div>
					</div>
					<div className="ml-3">
						<p className="text-gray-900 whitespace-no-wrap">{title}</p>
					</div>
				</div>
			</td>
			<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<p className="text-gray-900 whitespace-no-wrap">{location}</p>
			</td>
			<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<p className="text-gray-900 whitespace-no-wrap">${price}</p>
			</td>
			<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<p className="text-gray-900 whitespace-no-wrap">{format(new Date(from), "P")}</p>
			</td>
			<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<p className="text-gray-900 whitespace-no-wrap">{format(new Date(to), "P")}</p>
			</td>
			<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<span
					onClick={() => setIsOpen(true)}
					className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
				>
					<span
						aria-hidden="true"
						className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
					></span>
					<span className="relative">Cancel</span>
				</span>
				<DeleteModal
					isOpen={isOpen}
					id={booking._id}
					closeModal={closeModal}
					modalHandler={modalHandler}
				/>
			</td>
		</tr>
	);
};

export default TableRow;
