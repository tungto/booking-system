const Empty = ({ resourceName }: { resourceName: string }) => {
	return <div>{`No ${resourceName} could be found`}</div>;
};

export default Empty;
