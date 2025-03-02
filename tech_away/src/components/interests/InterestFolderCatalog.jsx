import React from 'react'
import InterestFolderCard from './InterestFolderCard';
import { Col, Container, Row } from 'react-bootstrap';

export default function InterestFolderCatalog({folders}) {
    return (
        <Container>
          <Row className='d-flex flex-md-row flex-column'>
            {folders.map((f, index) => (
              <Col
                key={index}
                xs={12} sm={6} md={4} lg={3}
                className="d-flex"
              >
                <InterestFolderCard index={index} iFolder={f} />
              </Col>
            ))}
          </Row>
        </Container>
      );
}
