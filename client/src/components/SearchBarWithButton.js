import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBarWithButton = ({
  searchTerm,
  onSearch,
  placeholder,
  buttonLabel = 'Shartnoma qo‘shish',
  buttonRoute = '/add',
}) => {
  const navigate = useNavigate();

  return (
    <Row className="align-items-center mb-3">
      <Col xs={12} md={6}>
        <Form>
          <Form.Control
            type="text"
            placeholder={placeholder || "🔍 Qidiruv..."}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Form>
      </Col>
      <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
        <Button variant="primary" onClick={() => navigate(buttonRoute)}>
          {buttonLabel}
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBarWithButton;
