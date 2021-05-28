import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className="ml-auto">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Chercher des stories..."
        className="mr-sm-2 ml-sm-5"
        style={{ width: 300 }}
      ></Form.Control>
      <Button type="submit" variant="outline-primary" className="p-2">
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
