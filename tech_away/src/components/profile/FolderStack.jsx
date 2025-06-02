import React, { useContext, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";

const FolderStack = () => {
	const { folders, fetchInterestFolders } = useInterests();

	useEffect(() => {
		fetchInterestFolders();
	}, []);

	return <Stack direction="horizontal"></Stack>;
};

export default FolderStack;
