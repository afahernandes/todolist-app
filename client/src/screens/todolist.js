import { AntDesign,  Ionicons } from "@expo/vector-icons";
import {
  Box,
  Fab,
  FlatList,
  Heading,
  Icon,
  HStack,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddTodo from "../components/addTodo";
import { API } from "../config/api";
import { useIsFocused } from "@react-navigation/core";

export default function TodoList({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [wait, setWait] = useState(false);

  const IsFocused = useIsFocused();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  useEffect(() => {
    getTodos();
  }, [wait, showModal, IsFocused]);

  const getTodos = async () => {
    try {
      const response = await API("/todos");
      setTodos(response.data.data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    setWait(true);
    try {
      await API.delete("/todo/" + id);
      setWait(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const updateStatus = async (id) => {
    setWait(true);
    const body = {
      status: "Done"
    };
    try {
      const response = await API.patch("/todo/" + id, body);
      console.log(response);
      setWait(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // Create Function to fetchnpm
  const _dataTodos = ({ item }) => {
    return (
      <Box key={item.id} rounded="md" bg="#fff" my={1} mx={5} px={2}>
        <HStack width="100%">
          {item.status === "Proccess" ? (
            <Avatar
              rounded
              icon={{
                color: "white",
                name: "menu",
                size: 23,
                type: "AntDesign",
              }}
              onPress={() => updateStatus(item.id)}
              containerStyle={{
                backgroundColor: "#239132",
                alignSelf: "center",
              }}
            />
          ) : (
            <Avatar
              rounded
              icon={{
                color: "white",
                name: "check",
                size: 23,
                type: "AntDesign",
              }}
              containerStyle={{ backgroundColor: "#A20512",alignSelf: "center" }}
            />
          )}
          <View flex={5}>
            <ListItem
              onPress={() =>
                navigation.navigate("DetailTodo", {
                  id: item.id,
                  tittle: item.tittle,
                  description: item.description,
                  date: item.createdAt,
                  status: item.status,
                })
              }
              key={item.id.toString()}
            >
              <ListItem.Content>
                <ListItem.Title numberOfLines={1}>{item.tittle}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={2}>
                  {item.description}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>
          <TouchableOpacity
            containerStyle={{ alignSelf: "center" }}
            onPress={() => deleteTodo(item.id)}
          >
            <Ionicons name="ios-trash-outline" color="#A20512" size={23} />
          </TouchableOpacity>
        </HStack>
      </Box>
    );
  };

  return (
    <Box flex={1}>
      <Heading size="md" my={2} color="primary.400" mx={2}>
        {" "}
        What will you do today ?
      </Heading>
      <FlatList
        data={todos}
        renderItem={_dataTodos}
        keyExtractor={(item) => item.id.toString()}
      />

      <Fab
        renderInPortal={false}
        position="absolute"
        size="sm"
        onPress={handleShow}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
      />
      <AddTodo showModal={showModal} handleClose={handleClose} />
    </Box>
  );
}
