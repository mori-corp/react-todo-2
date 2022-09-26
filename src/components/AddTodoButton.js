import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const AddTodoButton = ({ writeToDatabase }) => {
  const SquareButton = (props) => {
    return (
      <Button
        bg="#edf2f4"
        width="0px"
        _hover={{ opacity: "0.8" }}
        rounded="lg"
        {...props}
      />
    );
  };
  return (
    <>
      {/* Todo追加モード時のボタン */}
      <SquareButton onClick={writeToDatabase}>
        <AddIcon width="24px" height="24px" color="#2b2d42" />
      </SquareButton>
    </>
  );
};
