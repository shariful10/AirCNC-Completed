// Add Booking to Database
export const addBooking = async (bookingData) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bookingData),
	});
	const data = await response.json();
	return data;
};

// Update Room Status
export const updateStatus = async (id, status) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/status/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    const data = await response.json();
    return data;
};

// Get All Bookings for a user by email
export const getBookings = async (email) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${email}`);
    const bookings = await response.json();
    return bookings;
}

// Delete a Booking Room
export const deleteBooking = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    };