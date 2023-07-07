import React from "react";
import { DateRange } from "react-date-range";

const Calender = ({ value, handleSelect }) => {
	return (
		<DateRange
			rangeColors={["#f43f5e"]}
			ranges={[value]}
			onChange={handleSelect}
			date={value.startDate}
			direction="vertical"
			showDateDisplay={false}
			minDate={value.startDate}
			maxDate={value.endDate}
		/>
	);
};

export default Calender;
