import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";

export default function FolderContent() {
	const { folderToOpen, loadedInterests, fetchInterests } = useInterests();
	useEffect(() => {
		fetchInterests();
	}, []);

	return (
		<Stack direction="vertical">
			{folderToOpen != null && (
				<Stack
					direction="horizontal"
					className="justify-content-start align-items-start flex-wrap"
					gap={5}
				>
					<p className="m-0 d-flex gap-2 align-items-center">
						<i className="pi pi-plus"></i>
						<span>Add Interests to Folder</span>
					</p>
					<p className="m-0 d-flex gap-2 align-items-center">
						<i className="pi pi-pencil"></i> <span>Edit Folder</span>
					</p>
					<p className="m-0 d-flex gap-2 align-items-center">
						<i className="pi pi-trash"></i>
						<span>Delete Folder</span>
					</p>
				</Stack>
			)}
			{loadedInterests != null &&
				loadedInterests.map((interest, index) => <Stack key={index}></Stack>)}
		</Stack>
	);
}
