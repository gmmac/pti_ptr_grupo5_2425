import React from "react";
import { Card, Alert, Table } from "react-bootstrap";

export default function ReportSection({ title, data, columns }) {
  const colWidth = `${100 / columns.length}%`;

  return (
    <Card className="mb-4 shadow-sm rounded">
      <Card.Header className="bg-white border-0">
        <h6 className="mb-0 text-uppercase text-muted">{title}</h6>
      </Card.Header>
      <Card.Body>
        {data?.length > 0 ? (
          <Table responsive striped hover bordered className="mb-0">
            <thead className="table-light">
              <tr>
                {columns.map(col => (
                  <th key={col.key} style={{ width: colWidth }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {columns.map(col => (
                    <td key={col.key} style={{ width: colWidth }}>{row[col.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">No {title.toLowerCase()} to display.</Alert>
        )}
      </Card.Body>
    </Card>
  );
}