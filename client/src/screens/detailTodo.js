import { Ionicons } from "@expo/vector-icons";
import { Box, Button, Center, Heading, Input, Stack } from "native-base";
import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { API } from "../config/api";
export default function DetailTodo({route}) {
    const id=route.params.id;
    const dateNow=route.params.date;
    const status=route.params.status;
    const [tittle, setTittle] = React.useState("");
    const [description, setDescription] = React.useState("");
                        
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const date=new Date(dateNow);
   
    useEffect(() => {
        setTittle(route.params.tittle)
        setDescription(route.params.description)
      }, []);
    const updateTodo = async () => {
        try {
         
          const data={tittle,description}
          console.log(tittle,description)
          const response = await API.patch("/todo/"+id, data);
          Alert.alert(
            "Sucess",
            "Success Update Todo",
            [
              { text: "OK"}
            ]
          );
        } catch (error) {
          console.log(error);
        }
      };
    


  return (
    <Box
      alignSelf="center"
      bg="white"
      style
      my={5}
      padding={2}
      shadow={2}
      rounded="lg"
      width ="90%"
    >
        <Center>
      <Ionicons name="ios-newspaper" color="#A20512" size={100} />
        </Center>
      <Stack space={2} p={[4, 4, 8]}width="100%">
      <Heading bold color="primary.400">
        Detail Todo
         </Heading>
        <Text >{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Text>
        <Input
            color="#000"
            mt={4}
            value={tittle}
            onChangeText={(e) => {
              setTittle(e);
            }}
            placeholder="Tittle"
          />
          <Input
            color="#000"
            mt={2}  value={description}
         
            onChangeText={(e) => {
              setDescription(e);
            }}
            placeholder="Description"
          />
          <Button _text={{ color: "#fff" }} onPress={updateTodo}> 
            UPDATE
          </Button>
      </Stack>
    </Box>
  );
}

const styles = StyleSheet.create({});
