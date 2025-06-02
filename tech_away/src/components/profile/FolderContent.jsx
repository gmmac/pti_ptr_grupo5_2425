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
			<Stack direction="horizontal" gap={4} className="flex-wrap">
				{loadedInterests != null &&
					loadedInterests.map((interest, index) => (
						<Stack
							key={index}
							className="p-3"
							style={{
								backgroundColor: "var(--variant-one-light)",
								borderRadius: "16px",
							}}
						>
							<p className="m-0">Interest ID: {interest.id}</p>
							<p className="m-0">
								Creation date:{" "}
								{new Date(interest.createdAt).toLocaleDateString("pt-PT")}{" "}
							</p>
						</Stack>
					))}
			</Stack>
		</Stack>
	);
}
