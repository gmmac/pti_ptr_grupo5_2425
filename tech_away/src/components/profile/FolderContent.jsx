import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";

export default function FolderContent() {
  const { folderToOpen, loadedInterests, fetchInterests } = useInterests();

  useEffect(() => {
    fetchInterests();
    console.log(loadedInterests);
  }, [folderToOpen]);

  return (
    <Stack direction="vertical" gap={4}>
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
              <p className="m-0">
                Interest in {interest?.model.name}, {interest?.brand.name},{" "}
                {interest?.type.name}
              </p>

              <p className="m-0 text-muted">
                Creation date:{" "}
                {new Date(interest.createdAt).toLocaleDateString("pt-PT")}{" "}
              </p>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
}
