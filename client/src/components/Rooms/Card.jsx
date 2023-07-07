import React from "react";
import HeartButton from "../Button/HeartButton";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-hot-toast";

const Card = ({ room }) => {
	const { user } = useAuth();

	const handleClick = () => {
		if (!user) {
			toast.error("You Have to Login First!");
		}
	};

	return (
		<Link to={`/room/${room._id}`} onClick={handleClick} className="col-span-1 cursor-pointer group">
			<div className="flex flex-col gap-2 w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<img
						className="object-cover h-full w-full group-hover:scale-110 transition"
						src={room.image}
						alt="Room"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton />
					</div>
				</div>
				<div className="font-semibold text-lg">{room.location}</div>
				<div className="font-medium text-neutral-500">5 nights . {room.dateRange}</div>
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold">$ {room.price}</div>
					<div className="font-medium">night</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
