import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, TextInput } from "react-native";
import { RadioButton, Modal, Button, Text } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [todos, setTodos] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  //Get all todos from the server
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("https://restapi-mongo.onrender.com/todos");
      const data = await response.json();
      setTodos(data);
    };
    getTodos();
  }, [todos]);

  const todoComplete = async (id) => {};

  //open modal
  const modalPop = () => {
    setVisible(true);
  };

  //close modal
  const hideModal = () => setVisible(false);

  //add Task
  const addTask = () => {};

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: 400,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 99,
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>All Tasks</Text>
      <StatusBar style="auto" />
      <View style={styles.tasks}>
        {todos.map((todo, index) => {
          return (
            <View key={todo._id} style={styles.oneTask}>
              <Text>{todo.title}</Text>
              <RadioButton
                status={checked ? "checked" : "unchecked"}
                onPress={todoComplete.bind(null, todo._id)}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.addTask}>
        <Ionicons
          onPress={modalPop}
          name="md-add-circle"
          size={64}
          color="blue"
        />
      </View>

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Create New Task</Text>
        <TextInput placeholder="Add Todo" />
        <Button onPress={addTask}>Add</Button>
      </Modal>
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
  header_text: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: "bold",
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
    shadowOpacity: 0.2,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    marginTop: 20,
    paddingHorizontal: 20,
    marginVertical: 6,
    zIndex: -1,
  },
  addTask: {
    position: "absolute",
    bottom: 30,
  },
});
