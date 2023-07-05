import React from "react";
import { DateRange } from 'react-date-range'

const Calender = () => {
	return (
		<DateRange
			rangeColors={["#262626"]}
			date={new Date()}
			direction="vertical"
			showDateDisplay={false}
			minDate={new Date()}
		/>
	);
};

export default Calender;
