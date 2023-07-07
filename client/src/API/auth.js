// Save User To Database
export const saveUser = (user) => {
	const currentUser = {
		email: user.email,
	};
	fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(currentUser),
	})
		.then((res) => res.json())
		.then((data) => console.log(data));
};

// Become a Host
export const becomeHost = (email) => {
	const currentUser = {
		role: "host",
	};
	return fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(currentUser),
	}).then((res) => res.json());
};

// Get Role
export const getRole = async (email) => {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`);
	const user = await res.json();
	return user?.role;
};
