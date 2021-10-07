import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API } from "../config/api";
import { useIsFocused } from "@react-navigation/core";

export default function History({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [wait, setWait] = useState(false);

  const IsFocused = useIsFocused();

  useEffect(() => {
    getTodos();
  }, [wait,  IsFocused]);

  const getTodos = async () => {
    try {
      const response = await API("/history");
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
              // onPress={() =>
              //   navigation.navigate("DetailTodo", {
              //     id: item.id,
              //     tittle: item.tittle,
              //     description: item.description,
              //     date: item.createdAt,
              //     status: item.status,
              //   })
              // }
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
       Finished Todo List
      </Heading>
      <FlatList
        data={todos}
        renderItem={_dataTodos}
        keyExtractor={(item) => item.id.toString()}
      />

     
    </Box>
  );
}
