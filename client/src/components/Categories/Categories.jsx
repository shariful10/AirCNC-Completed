import React from "react";
import { categories } from "./categoriesData";
import CategoryBox from "./CategoryBox";

const Categories = () => {
	return (
		<div className="flex flex-row pt-4 justify-between items-center overflow-x-auto">
			{categories.map((item) => (
				<CategoryBox label={item.label} icon={item.icon} key={item.label} />
			))}
		</div>
	);
};

export default Categories;
