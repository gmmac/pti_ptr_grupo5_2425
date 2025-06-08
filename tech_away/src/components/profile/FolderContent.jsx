import React, { useEffect, useState, useRef } from "react";
import { Stack } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";
import DetailsModal from "../interests/DetailsModal";
import DeleteInterestModal from "../interests/DeleteInterestModal";
import { Toast } from "primereact/toast";

export default function FolderContent() {
  const {
    folderToOpen,
    loadedInterests,
    fetchInterests,
    deleteInterest,
    editInterest,
  } = useInterests();
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toastRef = useRef(null);

  useEffect(() => {
    fetchInterests();
  }, [folderToOpen]);

  const handleDelete = () => {
    deleteInterest(selectedInterest.id);
    setSelectedInterest(null); // limpa o interesse selecionado
    toastRef.current?.show({
      severity: "success",
      summary: "Interest Deleted",
      detail: "The selected interest was successfully deleted.",
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toastRef} />
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
              <i className="pi pi-pencil"></i>
              <span>Edit Folder</span>
            </p>
            <p className="m-0 d-flex gap-2 align-items-center">
              <i className="pi pi-trash"></i>
              <span>Delete Folder</span>
            </p>
          </Stack>
        )}
        <Stack direction="horizontal" gap={4} className="flex-wrap">
          {loadedInterests?.map((interest, index) => (
            <Stack
              direction="horizontal"
              gap={4}
              key={index}
              className="p-3 align-items-start"
              style={{
                backgroundColor: "var(--variant-one-light)",
                borderRadius: "16px",
              }}
            >
              <Stack>
                <p className="m-0">
                  Interest in{" "}
                  {[
                    interest?.model?.name,
                    interest?.brand?.name,
                    interest?.type?.name,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>

                {interest?.preferredStores?.length > 0 && (
                  <p className="m-0 text-muted">
                    {interest.preferredStores.map((store, index) => (
                      <span key={index}>
                        {store.store?.name || store.storeId}
                        {index < interest.preferredStores.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}
                <p className="m-0 text-muted">
                  Creation date:{" "}
                  {new Date(interest.createdAt).toLocaleDateString("pt-PT")}
                </p>
              </Stack>
              <i
                className="pi pi-external-link mt-1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedInterest(interest);
                  setShowDetails(true);
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
      {/* Modal de detalhes */}
      <DetailsModal
        show={showDetails}
        setShow={setShowDetails}
        interest={selectedInterest}
        openDeleteModal={() => setShowDelete(true)}
        editInterest={editInterest}
      />
      <DeleteInterestModal
        show={showDelete}
        setShow={setShowDelete}
        onConfirm={handleDelete}
        reopenDetails={() => setShowDetails(true)}
      />
    </>
  );
}
