import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView, Button, TextInput, Modal } from "react-native";





const App = () => {
  const [data, setData] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('')
  const [age, setAge] = useState('');
  const [currentListId,setCurrentListId] = useState(null);

  const getApiData = async () => {
    const url = "http://10.0.2.2:3000/users"
    const response = await fetch(url);
    const json = await response.json();
    if (json) {
      setData(json);
    }
  };

  const delteList = async (listId) => {
    const url = `http://10.0.2.2:3000/users/${listId}`
    const response = await fetch(url, {
      method: "DELETE",
    });
    const json = await response.json();
    getApiData()
  }

  const updateList = async (currentList) => {
    setCurrentListId(currentList.id);
    setName(currentList.name);
    setAge(currentList.age);
    setOpenModal(true)
    
  }
const saveUpdatedData=async ()=>{
  const url = `http://10.0.2.2:3000/users/${currentListId}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': "Application/Json",
      },
      body: JSON.stringify({name,age})
    });
    const json = await response.json();
    getApiData()
    setOpenModal(false)
}

  useEffect(() => {
    getApiData();
  }, [])

  return (
    <View style={styles.container} >

      <ScrollView>

        <View style={styles.dataWrapper}>

          <View style={styles.container} ><Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000", marginLeft: 30 }} >Name</Text></View>
          <View style={styles.container} ><Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000", marginLeft: 50 }} >Age</Text></View>
          <View style={styles.container} ><Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000", marginLeft: 10 }} >Operations</Text></View>


        </View>
        {data.length ?
          data.map((item) =>
            <View style={styles.dataWrapper} key={item.id}>
              <View style={styles.container} ><Text style={[styles.basicTextStyle]} >{item.name}</Text></View>
              <View style={styles.container} ><Text style={styles.basicTextStyle} >{item.age}</Text></View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ marginLeft: 1, overflow: "hidden" }} ><Button title="Update" onPress={() => updateList(item)} /></View>
                <View style={{ marginLeft: 1, overflow: "hidden" }}><Button title="Delete" onPress={() => delteList(item.id)} /></View>
              </View>
            </View>) : null}

        <Modal
          visible={openModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.centeredModal} >
            <View style={styles.modalView} >
              {/* <Text style={{fontSize:30,fontWeight:'bold'}} >Edit List</Text> */}
              <TextInput placeholder="Enter Name" value={name} style={styles.input} onChangeText={(text) =>setName(text)} />
              <TextInput placeholder="Enter age" value={age.toString()} style={styles.input}
                onChangeText={(text) => setAge(text) } />
              <View style={{marginBottom:5}} >
              <Button title="Save" onPress={saveUpdatedData} />
              </View>
              <Button title="Close" onPress={() => setOpenModal(false)} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
  centeredModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    padding: 35,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 1,
    elevation: 5
  },
  dataWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
    backgroundColor: 'orange',
    margin: 5,
    padding: 10
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: "black",
    margin: 5,
    paddingLeft: 20,
    width: 300
  },
  basicTextStyle: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff"
  }
})

export default App;