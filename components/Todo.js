import { View, StyleSheet } from "react-native";
import React from "react";

import { RadioButton, Text } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

const Todo = ({ todo, todoComplete, removeTodo }) => {
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
};

export default Todo;

const styles = StyleSheet.create({
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
});
