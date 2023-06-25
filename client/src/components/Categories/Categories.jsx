import React from "react";
import Container from "../Shared/Container";
import { categories } from "./categoriesData";
import CategoryBox from "./CategoryBox";

const Categories = () => {
	return (
		<Container>
			<div className="flex flex-row pt-4 justify-between items-center overflow-x-auto">
				{categories.map((item) => (
					<CategoryBox label={item.label} icon={item.icon} key={item.label} />
				))}
			</div>
		</Container>
	);
};

export default Categories;
