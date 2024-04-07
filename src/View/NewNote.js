// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   KeyboardAvoidingView,
//   Alert,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import SQLite from 'react-native-sqlite-storage';
// import {deviceHeight} from '../../App';

// const NewNote = ({navigation}) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [todoValue, setTodoValue] = useState('');
//   const [todoTitle, setTodoTitle] = useState('');
//   const [storeData, setStoreData] = useState([]);

//   const db = SQLite.openDatabase(
//     {
//       name: 'mydb',
//       location: 'default',
//     },
//     () => {
//       console.log('Database connected!');
//     }, //on success
//     error => console.log('Database error', error), //on error
//   );

//   const createNoteTable = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'ALTER TABLE users ADD COLUMN todo VARCHAR',
//         'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR, todo VARCHAR)',
//         [],
//         () => {
//           console.log('Table created successfully');
//         },
//         error => {
//           console.log('Create table error', error);
//         },
//       );
//     });
//   };

//   useEffect(()=>{
//     createNoteTable();
//   },[])

//   const handleFormSubmit = () => {
//     const currentDate = new Date();
//     const sql = 'INSERT INTO users ( todo,name,email) VALUES (?,?,?)';
//     const params = [todoValue, currentDate, todoTitle];
//     //console.log('Params Data--->', params)

//     db.transaction(tx => {
//       tx.executeSql(
//         sql,
//         params,
//         () => {
//           Alert.alert('Success', 'Notes created successfully');
//           setTodoTitle('');
//           setTodoValue('');
//           listNotes();
//           navigation.navigate('Note');
//         },
//         error => {
//           console.log('Create note error', error);
//         },
//       );
//     });
//     navigation.goBack();
//   };

//   const createNote = () => {
//     handleFormSubmit();
//   };

//   const deleteNote = id => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'DELETE FROM users WHERE id = ?',
//         [id],
//         (tx, results) => {
//           console.log('Note deleted successfully');
//           listNotes(); // Update the list after deletion
//         },
//         error => {
//           console.log('Error deleting note', error);
//         },
//       );
//     });
//   };
//   return (
//     <KeyboardAvoidingView style={{flex: 1}}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'white',
//         }}>
//         <View
//           style={{
//             paddingHorizontal: 8,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <TouchableOpacity
//             style={{
//               height: 42,
//               width: 42,
//               marginTop: 14,
//               marginLeft: 10,
//               paddingBottom: 5,
//               borderRadius: 46,
//               position: 'relative',
//               backgroundColor: '#0f2064',
//               justifyContent: 'center',
//             }}
//             onPress={() => createNote()}>
//             <Image
//               source={require('../../assets/back.png')}
//               style={{height: 22, marginTop: 4, width: 22, alignSelf: 'center'}}
//               tintColor={'white'}></Image>
//             {/* <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold', textAlign: 'center', }}>{"⇦"}</Text> */}
//           </TouchableOpacity>
//           <Text
//             style={{
//               fontSize: 28,
//               marginTop: 14,
//               color: 'black',
//               fontWeight: '600',
//               alignSelf: 'center',
//             }}>
//             Create Note
//           </Text>
//           <TouchableOpacity
//             style={{
//               marginTop: 14,
//               marginLeft: 10,
//               paddingBottom: 5,
//               borderRadius: 46,
//               position: 'relative',
//               justifyContent: 'center',
//             }}></TouchableOpacity>
//         </View>
//         <View style={{flex: 1, backgroundColor: 'white', margin: 20}}>
//           <TextInput
//             style={{
//               height: deviceHeight / 14,
//               backgroundColor: 'white',
//               fontSize: 22,
//               color: 'black',
//               fontWeight: '800',
//             }}
//             placeholder="Enter notes title"
//             value={todoTitle}
//             onChangeText={(val)=>setTodoTitle(val)}></TextInput>
//           <TextInput
//             style={{
//               flex: 1,
//               fontSize: 18,
//               backgroundColor: 'white',
//               textAlignVertical: 'top',
//             }}
//             placeholder="Enter notes details"
//             multiline={true}
//             value={todoValue}
//             onChangeText={(val)=>setTodoValue(val)}></TextInput>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default NewNote;

// const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {deviceHeight} from '../../App';

const NewNote = ({navigation}) => {
  const [todoValue, setTodoValue] = useState('');
  const [todoTitle, setTodoTitle] = useState('');

  const db = SQLite.openDatabase(
    {
      name: 'mydb',
      location: 'default',
    },
    () => {
      console.log('Database connected!');
    },
    error => console.log('Database error', error),
  );

  const createNoteTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, todo VARCHAR, name VARCHAR, email VARCHAR)',
        [],
        () => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Create table error', error);
        },
      );
    });
  };

  

  const handleFormSubmit = () => {
    if(todoTitle || todoValue){
        const currentDate = new Date();
        const sql = 'INSERT INTO users (todo, name, email) VALUES (?, ?, ?)';
        const params = [todoValue,currentDate.toString(),todoTitle]; // Adjust according to your data structure
    
        db.transaction(tx => {
          tx.executeSql(
            sql,
            params,
            (_, result) => {
              Alert.alert('Success', 'Note created successfully');
              setTodoTitle('');
              setTodoValue('');
              navigation.navigate('Home');
            },
            error => {
              console.log('Create note error', error);
            },
          );
        });
    }else{
        Alert.alert('Message','Please fill the details')
    }

  };

  const createNote = () => {
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
            onPress={() => createNote()}>
            <Image
              source={require('../../assets/back.png')}
              style={{height: 22, marginTop: 4, width: 22, alignSelf: 'center'}}
              tintColor={'white'}></Image>
            {/* <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold', textAlign: 'center', }}>{"⇦"}</Text> */}
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              marginTop: 14,
              color: 'black',
              fontWeight: '600',
              alignSelf: 'center',
            }}>
            Create Note
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 14,
              marginLeft: 10,
              paddingBottom: 5,
              borderRadius: 46,
              position: 'relative',
              justifyContent: 'center',
            }}></TouchableOpacity>
        </View>
        <View style={{flex: 1, backgroundColor: 'white', margin: 20}}>
          <TextInput
            style={{
              height: deviceHeight / 14,
              backgroundColor: 'white',
              fontSize: 22,
              color: 'black',
              fontWeight: '800',
            }}
            placeholder="Enter notes title"
            value={todoTitle}
            onChangeText={val => setTodoTitle(val)}></TextInput>
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              backgroundColor: 'white',
              textAlignVertical: 'top',
            }}
            placeholder="Enter notes details"
            multiline={true}
            value={todoValue}
            onChangeText={val => setTodoValue(val)}></TextInput>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewNote;

const styles = StyleSheet.create({});
