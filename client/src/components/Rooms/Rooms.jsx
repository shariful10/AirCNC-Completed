import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "../Shared/Loader";
import { useSearchParams } from "react-router-dom";

const Rooms = () => {
	const [params, setParams] = useSearchParams();
	const category = params.get("category");
	console.log(category);

	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("rooms.json")
			.then((res) => res.json())
			.then((data) => {
				setRooms(data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
			{rooms.map((room, index) => (
				<Card key={index} room={room} />
			))}
		</div>
	);
};

export default Rooms;
