import React from "react";
import { Text, Box, HStack, Spacer } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const TodoRows = ({
  todo,
  onHandleStatusChange,
  onHandleUpdateTodo,
  onHandleDelete,
}) => {
  return (
    <HStack key={todo.uuid}>
      <HStack
        cursor="pointer"
        p={1}
        onClick={() => onHandleStatusChange(todo)}
        my={2}
        w="100%"
        _hover={{ bg: "#8d99ae" }}
        borderRadius="10px"
      >
        {/* circle element */}
        <Box width={3} height={3} bg="#edf2f4" borderRadius="100%"></Box>

        {todo.isCompleted ? (
          <Text textDecoration="line-through" color="gray.500">
            {todo.todo}
          </Text>
        ) : (
          <Text>{todo.todo}</Text>
        )}
      </HStack>
      <Spacer />

      {/*　編集ボタン */}
      <EditIcon
        onClick={() => onHandleUpdateTodo(todo)}
        cursor="pointer"
        width="22px"
        height="22px"
        _hover={{ color: "#d90429" }}
      >
        update
      </EditIcon>

      {/* 削除ボタン */}
      <DeleteIcon
        onClick={() => {
          onHandleDelete(todo);
        }}
        width="22px"
        height="22px"
        _hover={{ color: "#d90429" }}
      >
        delete
      </DeleteIcon>
    </HStack>
  );
};
