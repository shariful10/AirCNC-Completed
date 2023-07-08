import React, { useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../API/utils";
import useAuth from "../../components/Hooks/useAuth";
import { addRoom } from "../../API/rooms";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [dates, setDates] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});
	const [loading, setLoading] = useState(false);
	const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const location = form.location.value;
		const title = form.title.value;
		const from = dates.startDate;
		const to = dates.endDate;
		const price = form.price.value;
		const guests = form.guests.value;
		const bedrooms = form.bedrooms.value;
		const bathrooms = form.bathrooms.value;
		const description = form.description.value;
		const category = form.category.value;
		const image = form.image.files[0];
		setUploadButtonText("Uploading...");

		// Upload image
		imageUpload(image)
			.then((data) => {
				const roomData = {
					location: location,
					title,
					from,
					to,
					price: parseFloat(price),
					guests,
					bedrooms,
					bathrooms,
					image: data.data.display_url,
					host: {
						name: user?.displayName,
						image: user?.photoURL,
						email: user?.email,
					},
					category,
					description,
				};
				addRoom(roomData)
					.then((data) => {
						console.log(data);
						setUploadButtonText("Uploaded!");
						setLoading(false);
						toast.success("Room Added Successfully");
						navigate("/dashboard/my-listings");
						form.reset();
					})
					.catch((err) => console.log(err));
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setLoading(false);
			});

		console.log(location);
	};

	const handleImageChange = (image) => {
		setUploadButtonText(image.name);
	};

	const handleDates = (ranges) => {
		setDates(ranges.selection);
	};

	return (
		<AddRoomForm
			dates={dates}
			loading={loading}
			handleDates={handleDates}
			handleSubmit={handleSubmit}
			uploadButtonText={uploadButtonText}
			handleImageChange={handleImageChange}
		/>
	);
};

export default AddRoom;
