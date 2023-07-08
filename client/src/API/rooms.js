// Add a Room
export const addRoom = async (roomData) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(roomData),
	});
	const data = await response.json();
	return data;
};

// Get All Rooms Data
export const getAllRooms = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
	const data = await response.json();
	return data;
};

// Get Rooms For Host By Email
export const getRooms = async (email) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${email}`);
	const data = await response.json();
	return data;
};

// Get Room Data
export const getRoom = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`);
	const data = await response.json();
	return data;
};

// Delete Room Data
export const deleteRoom = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};
