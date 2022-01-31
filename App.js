import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, SafeAreaView, TextInput } from "react-native";
import {
  RadioButton,
  Modal,
  Portal,
  Button,
  Text,
  Provider,
} from "react-native-paper";

export default function App() {
  const [checked, setChecked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const modalPop = () => {
    setVisible(true);
    console.log("modal pop");
  };
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: 400,
    justifyContent: "flex-start",
    alignItems: "center",
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>All Tasks</Text>
      <StatusBar style="auto" />
      <View style={styles.tasks}>
        <View style={styles.oneTask}>
          <Text>Create new Project</Text>
          <RadioButton
            value="first"
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
          />
        </View>
      </View>
      <View style={styles.addTask}>
        <Text onPress={modalPop}>+</Text>
      </View>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Create New Task</Text>
          </Modal>
        </Portal>
      </Provider>
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
  },
  addTask: {
    position: "absolute",
    bottom: 30,
  },
});
