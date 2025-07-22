import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearch, placeholder }) => {
  return (
    <Form className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder || "🔍 Qidiruv..."}
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Form>
  );
};

export default SearchBar;
