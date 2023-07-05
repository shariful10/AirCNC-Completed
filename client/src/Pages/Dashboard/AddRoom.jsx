import React, { useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../API/utils";
import useAuth from "../../components/Hooks/useAuth";

const AddRoom = () => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const location = form.location.value;
		const title = form.title.value;
		// const from = dates.startDate;
		// const to = dates.endDate;
		const price = form.price.value;
		const total_guest = form.total_guest.value;
		const bedrooms = form.bedrooms.value;
		const bathrooms = form.bathrooms.value;
		const description = form.description.value;
		const category = form.category.value;
		const image = form.image.files[0];

		// Upload image
		imageUpload(image)
			.then((data) => {
				const roomData = {
					location: location,
					title,
					from,
					to,
					price: parseFloat(price),
					total_guest,
					bedrooms,
					bathrooms,
					image: data.data.display_url,
					host: {
						name: user?.displayName,
						image: user?.photoURL,
						email: user?.email,
					},
					category,
				};
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

	return (
		<AddRoomForm
			loading={loading}
			handleSubmit={handleSubmit}
			uploadButtonText={uploadButtonText}
			handleImageChange={handleImageChange}
		/>
	);
};

export default AddRoom;
