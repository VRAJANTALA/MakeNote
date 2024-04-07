import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {deviceHeight, deviceWidth} from '../../App';
import {useRoute} from '@react-navigation/native';

const EditNote = ({navigation}) => {
  const route = useRoute();
  const {id, name, email, todo} = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [todoValue, setTodoValue] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    setTodoTitle(email);
    setTodoValue(todo);
  }, [route.params]);

  const db = SQLite.openDatabase(
    {
      name: 'mydb',
      location: 'default',
    },
    () => {
      console.log('Database connected!');
    }, //on success
    error => console.log('Database error', error), //on error
  );
  const handleFormSubmit = () => {
    // Update existing user
    const sql = 'UPDATE users SET todo=?,name=?,email=? WHERE id=?';
    const currentDate = new Date();
    const params = [todoValue, currentDate, todoTitle, id];

    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        () => {
          Alert.alert('Success', 'Note updated successfully');
          setIsEditing(false);
          setSelectedItem(null);
          listNotes();
          setTodoValue('');
        },
        error => {
          console.log('Update Note error', error);
        },
      );
    });
    navigation.navigate('Home');
  };

  const EditNote = () => {
    handleFormSubmit();
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            paddingHorizontal: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              height: 42,
              width: 42,
              marginTop: 14,
              marginLeft: 10,
              paddingBottom: 5,
              borderRadius: 46,
              position: 'relative',
              backgroundColor: '#0f2064',
              justifyContent: 'center',
            }}
            onPress={() => EditNote()}>
            <Image
              source={require('../../assets/back.png')}
              style={{height: 22, marginTop: 4, width: 22, alignSelf: 'center'}}
              tintColor={'white'}></Image>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              marginTop: 14,
              color: 'black',
              fontWeight: '600',
              alignSelf: 'center',
            }}>
            Edit Note
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 14,
              marginLeft: 10,
              paddingBottom: 5,
              borderRadius: 46,
              position: 'relative',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/delete.png')}
              style={{
                height: 26,
                width: 26,
                marginTop: 4,
                alignSelf: 'center',
              }}
              tintColor={'red'}></Image>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, margin: 20}}>
          <TextInput
            style={{
              height: deviceHeight / 14,
              backgroundColor: 'white',
              fontSize: 22,
              color: 'black',
              fontWeight: '800',
            }}
            value={todoTitle}
            onChangeText={setTodoTitle}></TextInput>
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              backgroundColor: 'white',
              textAlignVertical: 'top',
            }}
            multiline={true}
            value={todoValue}
            onChangeText={setTodoValue}></TextInput>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditNote;

const styles = StyleSheet.create({});
