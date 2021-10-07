import { Button, Input, Modal } from "native-base";
import React from "react";
import { Alert } from "react-native";
import { API } from "../config/api";
export default function AddTodo(props) {
  const { showModal, handleClose } = props;
  const [tittle, setTittle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      

      // const formData = new FormData();
      // formData.append("tittle", tittle);
      // formData.append("description", description);
      // formData.append("status", "Proccess");
      const data={tittle,description,status :"Proccess"}

      
       console.log(tittle,description)
      const response = await API.post("/todo", data);
      Alert.alert(
        "Sucess",
        "Success Add Todo",
        [
          { text: "OK", onPress: () => 
          handleClose() }
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={showModal} onClose={handleClose}>
      <Modal.Content bg="#fff">
        <Modal.CloseButton color="#00ff00" />
        <Modal.Header _text={{ color: "#A20512" }}>Add Todo</Modal.Header>
        <Modal.Body>
          <Input
            color="#000"
            mt={4}
            onChangeText={(e) => {
              setTittle(e);
            }}
            placeholder="Tittle"
          />
          <Input
            color="#000"
            mt={2}
            onChangeText={(e) => {
              setDescription(e);
            }}
            placeholder="Description"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button _text={{ color: "#fff" }} onPress={handleSubmit}>
            SAVE
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
