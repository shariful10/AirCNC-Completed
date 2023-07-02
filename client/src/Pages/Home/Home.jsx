import React from "react";
import Categories from "../../components/Categories/Categories";
import Rooms from "../../components/Rooms/Rooms";
import Container from "../../components/Shared/Container";

const Home = () => {
	return (
		<>
			<Container>
				<Categories />
				<Rooms />
			</Container>
		</>
	);
};

export default Home;
