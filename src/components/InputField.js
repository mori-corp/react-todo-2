import React from "react";
import { Input, InputGroup } from "@chakra-ui/react";

export const InputField = ({ todo, setTodo, inputRef }) => {
  return (
    <InputGroup>
      <Input
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        placeholder="Add todo"
        color="#fff"
        focusBorderColor="#edf2f4"
        autoFocus={true}
        ref={inputRef}
      />
    </InputGroup>
  );
};
