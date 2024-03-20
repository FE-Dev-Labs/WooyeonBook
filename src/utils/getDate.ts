export const getDate = (date: Date) => {
	const newDate = new Date(date);
	const year = newDate.getFullYear();
	const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
	const day = ('0' + newDate.getDate()).slice(-2);
	const dateString = year + '년' + month + '월' + day + '일';
	return dateString;
};
