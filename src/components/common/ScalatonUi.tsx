const ScalatonUi = ({
	wid,
	hei,
	bgc,
}: {
	wid?: string;
	hei?: string;
	bgc?: string;
}) => {
	return (
		<div
			style={{
				width: `${wid}`,
				height: `${hei}`,
				backgroundColor: `${bgc}`,
			}}></div>
	);
};

export default ScalatonUi;
