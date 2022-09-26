import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const EditTodoButton = ({
  onHandleSubmitChange,
  onHandleCloseEditMode,
}) => {
  // Chakra ui Buttonエレメントのスタイリング定義
  const SquareButton = (props) => {
    return (
      <Button
        bg="#ef233c"
        fontSize="12px"
        p={2}
        _hover={{ opacity: "0.9" }}
        variant="outline"
        rounded="lg"
        border="none"
        letterSpacing="1px"
        {...props}
      />
    );
  };
  return (
    <>
      <SquareButton onClick={onHandleSubmitChange}>update</SquareButton>
      <SquareButton onClick={onHandleCloseEditMode} bg="#edf2f4">
        <CloseIcon color="#2b2d42" />
      </SquareButton>
    </>
  );
};
