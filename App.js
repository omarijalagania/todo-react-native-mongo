import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { RadioButton, Button, Text } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [todos, setTodos] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");

  //Get all todos from the server
  useEffect(() => {
    try {
      const getTodos = async () => {
        const response = await fetch(
          "https://restapi-mongo.onrender.com/todos"
        );
        const data = await response.json();
        setTodos(data);
      };
      getTodos();
    } catch (error) {
      alert(error);
    }
  }, [todos, checked]);

  //complete todo
  const todoComplete = async (id) => {
    try {
      const response = await fetch(
        `https://restapi-mongo.onrender.com/complete/todo/${id}`
      );
      const data = await response.json();
    } catch (error) {
      alert(error);
    }
  };

  //add Todo
  const addTodo = async () => {
    if (text) {
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
      setVisible(false);
    } else {
      alert("Please enter a todo");
    }
  };

  //delete todo
  const removeTodo = async (id) => {
    try {
      const response = await fetch(
        `https://restapi-mongo.onrender.com/delete/todos/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  //open modal
  const modalPop = () => {
    setVisible(true);
  };

  //close modal
  const hideModal = () => setVisible(false);

  //Modal styles
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: 400,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 99,
  };

  //if No todos
  if (todos.length === 0) {
    return (
      <View style={styles.noTodo}>
        <Text>No Todos</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>All Tasks</Text>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.tasks}>
          {todos.map((todo, index) => {
            return (
              <View key={todo._id} style={styles.oneTask}>
                <Text>{todo.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton
                    value={todo._id}
                    status={todo.isComolete ? "checked" : "unchecked"}
                    onPress={todoComplete.bind(null, todo._id)}
                  />
                  <Ionicons
                    onPress={removeTodo.bind(null, todo._id)}
                    name="md-remove-circle"
                    size={32}
                    color="red"
                  />
                </View>
              </View>
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
      {/* afer modal */}

      {/* after modal end */}
    </SafeAreaView>
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
  oneTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 340,
    height: 80,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    marginVertical: 6,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    zIndex: -1,
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
  },
  modalView: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
});
