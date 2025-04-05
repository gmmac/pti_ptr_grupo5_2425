import { Button, Container, Table } from "react-bootstrap";

export default function CharityProjectTableView({ projects, onOpenDetails }) {
  return (
    <Container fluid className="p-3">
      <div className="table-responsive shadow-sm rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px", overflowX: "auto" }}>
        <Table hover bordered className="mb-0 d-none d-lg-table">
          <thead className="bg-light text-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>Completion Date</th>
              <th>Status</th>
              <th>Warehouse</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="align-middle" style={{ backgroundColor: "#ffffff" }}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                <td>{new Date(project.completionDate).toLocaleDateString()}</td>
                <td>{project.ProjectStatus?.state}</td>
                <td>{project.Warehouse?.name}</td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button size="xs" onClick={() => onOpenDetails(project)}>See Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
