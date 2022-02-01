import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import Spinner from "./components/Spinner";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { Button, Text } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";
import Todo from "./components/Todo";

export default function App() {
  const [todos, setTodos] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  //Get all todos from the server
  useEffect(() => {
    try {
      const getTodos = async () => {
        setIsLoading(true);
        const response = await fetch(
          "https://restapi-mongo.onrender.com/todos"
        );
        const data = await response.json();
        setTodos(data);
        setIsLoading(false);
      };
      getTodos();
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }, [setTodos, checked]);

  //complete todo
  const todoComplete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://restapi-mongo.onrender.com/complete/todo/${id}`
      );
      const data = await response.json();
      setChecked(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  //add Todo
  const addTodo = async () => {
    if (text) {
      setIsLoading(true);
      const response = await fetch(
        `https://restapi-mongo.onrender.com/add/todos/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: text,
          }),
        }
      );
      const data = await response.json();
      setChecked(data);
      setText(""); //clear the text input
      setIsLoading(false);
      setVisible(false);
    } else {
      setIsLoading(false);
      alert("Please enter a todo");
    }
  };

  //delete todo
  const removeTodo = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://restapi-mongo.onrender.com/delete/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      setChecked(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  //open modal
  const modalPop = () => {
    setVisible(true);
  };

  //close modal
  const hideModal = () => setVisible(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header_text}>All Tasks</Text>
        <StatusBar style="auto" />
        <ScrollView>
          <View style={styles.tasks}>
            {todos.map((todo, index) => {
              return (
                <Todo
                  key={todo._id}
                  todo={todo}
                  todoComplete={todoComplete}
                  removeTodo={removeTodo}
                />
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.addTask}>
          <Ionicons
            onPress={modalPop}
            name="md-add-circle"
            size={64}
            color="blue"
          />
        </View>

        <Modal animationType="slide" visible={visible}>
          <Text
            style={{
              marginBottom: 20,
              fontWeight: "bold",
              fontSize: 30,
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Create New Task
          </Text>
          <View style={styles.modalView}>
            <TextInput
              onChangeText={setText}
              value={text}
              style={styles.inputText}
              placeholder="Add Todo"
            />
            <View style={{ flexDirection: "row" }}>
              <Button onPress={addTodo}>Add</Button>
              <Button onPress={hideModal}>Close</Button>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      {isLoading && <Spinner />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  noTodo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    fontWeight: "bold",
    zIndex: 1,
  },
  header_text: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
  },
  tasks: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  inputText: {
    width: 300,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    marginBottom: 20,
  },
  addTask: {
    position: "absolute",
    bottom: 30,
    zIndex: 999,
  },
  modalView: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
});
