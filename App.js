import { useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import SandBox from "./components/SandBox";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2 " },
    { text: "play on the switch", key: "3" },
  ]);
  const pressHandler = (key) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.key !== key));
    console.log(key);
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => [
        { text, key: Math.random().toString() },
        ...prevTodos,
      ]);
    } else {
      Alert.alert("!OOPS", "TODOS Must be Over 3 Chars", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };
  return (
    // <SandBox />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 40,
    
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
