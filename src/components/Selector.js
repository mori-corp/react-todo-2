import React from "react";
import { Select, HStack } from "@chakra-ui/react";
export const Selector = ({ onSetFilter }) => {
  return (
    <HStack>
      <Select
        w="110px"
        h="28px"
        my={4}
        fontSize="14px"
        onChange={(e) => {
          onSetFilter(e.target.value);
        }}
      >
        <option value="all">すべて</option>
        <option value="notCompleted">未完了</option>
        <option value="completed">完了済み</option>
      </Select>
    </HStack>
  );
};
