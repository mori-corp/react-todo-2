import React, { useEffect, useState, useRef } from "react";
import { db } from "./FirebaseConfig";
import { uid } from "uid";
import {
  set,
  ref,
  onValue,
  remove,
  update,
  serverTimestamp,
} from "firebase/database";
import { Box, HStack, Spacer } from "@chakra-ui/react";
import { TodoRows } from "./components/TodoRows";
import { EditTodoButton } from "./components/EditTodoButton";
import { AddTodoButton } from "./components/AddTodoButton";
import { InputField } from "./components/InputField";
import { Selector } from "./components/Selector";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const inputEl = useRef(null);

  // マウント時、firebase databaseからtodoを読み込む
  useEffect(() => {
    onValue(ref(db), (snapshopt) => {
      setTodos([]);
      const data = snapshopt.val();

      if (data !== null) {
        Object.values(data).map((todo) => {
          // todosに各キーと値を設定
          setTodos((oldArray) => [
            ...oldArray,
            {
              todo: todo.todo,
              time: todo.time,
              uuid: todo.uuid,
              isCompleted: todo.isCompleted,
            },
          ]);
        });
      }
    });
  }, []);

  // firebaseへのデータの書き込み
  const writeToDatabase = () => {
    if (todo) {
      const uuid = uid();
      set(ref(db, `/${uuid}`), {
        todo: todo,
        uuid: uuid,
        isCompleted: false,
        time: serverTimestamp(),
      });
      setTodo("");
    }
  };

  // 削除ボタンがクリックされた時の関数
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };

  // updateボタンがクリックされた時の関数
  const handleUpdateTodo = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    setTodo(todo.todo);
    // editボタンクリック時に、自動的に入力蘭にフォーカスが当たる
    inputEl.current.focus();
  };

  // + ボタンを押した時の関数
  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      todo: todo,
      uuid: tempUuid,
    });

    setTodo("");
    setIsEdit(false);
  };

  // 編集モードを終了
  const handleCloseEditMode = () => {
    setIsEdit(false);
    setTodo("");
  };

  // 各todo部分をクリックした際に、isCompletedのtrue/falseを切り替える
  const handleStatusChange = (todo) => {
    const newIsComplete = !todo.isCompleted;
    update(ref(db, `/${todo.uuid}`), {
      isCompleted: newIsComplete,
    });
  };

  // ソート機能
  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        // optionで"未完了"が選択された場合
        case "notCompleted":
          setFilteredTodos(todos.filter((todo) => todo.isCompleted === false));
          break;
        // optionで"完了"が選択された場合
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.isCompleted === true));
          break;
        // optionで"すべて"が選択された場合
        case "all":
          setFilteredTodos(todos);
          break;
        // ここまで
        default:
          setFilteredTodos(todos);
      }
    };
    // 関数の呼び出し
    filteringTodos();
  }, [filter, todos]);

  return (
    <HStack m={2}>
      <Spacer />
      <Box
        textAlign="center"
        bg="#2b2d42"
        p={6}
        width="480px"
        color="#fff"
        borderRadius="15px"
      >
        <HStack>
          {/* インプットフィールド */}
          <InputField todo={todo} setTodo={setTodo} inputRef={inputEl} />
          {isEdit ? (
            // Editモード時の表示
            <EditTodoButton
              onHandleSubmitChange={handleSubmitChange}
              onHandleCloseEditMode={handleCloseEditMode}
            />
          ) : (
            // 追加モード時のボタン
            <AddTodoButton writeToDatabase={writeToDatabase} />
          )}
        </HStack>

        {/* ソート部分 */}
        <Selector onSetFilter={setFilter} />

        {/* 各Todoの表示部分 */}
        {filteredTodos.map((todo) => (
          <TodoRows
            key={todo.uuid}
            todo={todo}
            onHandleStatusChange={handleStatusChange}
            onHandleUpdateTodo={handleUpdateTodo}
            onHandleDelete={handleDelete}
            // isCompleted={todo.isCompleted}
          />
        ))}
      </Box>
      <Spacer />
    </HStack>
  );
}

export default App;
