import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const Home = ({navigation}) => {
  const [storeData, setStoreData] = useState([]);

  const db = SQLite.openDatabase({
    name: 'mydb',
    location: 'default',
  });

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      listNotes();
    });

    return () => {
      unsub;
    };
  }, [navigation]);

  const listNotes = async () => {
    let sql = 'SELECT * FROM users';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (_, resultSet) => {
          var data = [];
          var length = resultSet.rows.length;
          for (var i = 0; i < length; i++) {
            data.push(resultSet.rows.item(i));
          }
          setStoreData(data);
          console.log('store data--->', data);
        },
        error => {
          console.log('List note error', error);
        },
      );
    });
  };

  const deleteNote = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?',
        [id],
        (_, result) => {
          console.log('Note deleted successfully');
          listNotes(); // Update the list after deletion
        },
        error => {
          console.log('Error deleting note', error);
        },
      );
    });
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={{flex: 2}}>
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
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/note.png')}
              style={{
                height: 44,
                width: 44,
                marginTop: 4,
                alignSelf: 'center',
              }}></Image>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              marginTop: 14,
              color: 'black',
              fontWeight: '600',
              alignSelf: 'center',
            }}>
            All Notes
          </Text>
          <TouchableOpacity
            style={{
              height: 42,
              width: 42,
              marginTop: 14,
              marginLeft: 10,
              paddingBottom: 5,
              borderRadius: 46,
              position: 'relative',
              //backgroundColor: '#0f2064',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('Schedual');
            }}>
            <Image
              source={require('../../assets/schedule.png')}
              style={{
                height: 44,
                width: 44,
                marginTop: 4,
                alignSelf: 'center',
              }}></Image>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 11,
          }}>
          {/* <TouchableOpacity
                    style={{ backgroundColor: 'grey', height: 30, width: 133 }}
                    onPress={() => AllNoteDelete()}>
                    <Text>Delete All Note</Text>
                </TouchableOpacity> */}
          <FlatList
            data={storeData}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item, index}) => {
              if (!item) {
                return null;
              }

              return (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderRadius: 8,
                    marginVertical: 9,
                    padding: 2,
                    marginHorizontal: 22,
                  }}>
                  <View
                    style={[
                      styles.cardSideView,
                      {
                        backgroundColor:
                          index % 7 === 0
                            ? 'coral'
                            : index % 7 === 1
                            ? '#f6669d'
                            : index % 7 === 2
                            ? '#b3a957'
                            : index % 7 === 3
                            ? '#63aa85'
                            : index % 7 === 4
                            ? '#b397f0'
                            : index % 7 === 5
                            ? '#54a7e9'
                            : index % 7 === 6
                            ? '#696969'
                            : 'coral',
                      },
                    ]}></View>

                  <View
                    style={{
                      flex: 80,
                      flexDirection: 'row',
                      backgroundColor: 'green',
                    }}>
                    <View
                      style={{
                        flex: 56,
                        padding: 5,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={[
                          styles.todoTitle,
                          {
                            color:
                              index % 7 === 0
                                ? 'coral'
                                : index % 7 === 1
                                ? '#f6669d'
                                : index % 7 === 2
                                ? '#b3a957'
                                : index % 7 === 3
                                ? '#63aa85'
                                : index % 7 === 4
                                ? '#b397f0'
                                : index % 7 === 5
                                ? '#54a7e9'
                                : index % 7 === 6
                                ? '#696969'
                                : 'coral',
                          },
                        ]}>
                        {item.email}
                      </Text>
                      <Text style={styles.todoDate}>{item.name}</Text>
                      <Text style={styles.todoTxt}>{item.todo}</Text>
                    </View>
                    <View
                      style={{
                        flex: 7,
                        paddingBottom: 11,
                        backgroundColor: 'white',
                        paddingRight: 11,
                        justifyContent: 'flex-start',
                      }}>
                      {/* <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('EditNote', item);
                                                // setIsEditing(true);
                                                // setSelectedItem(item);
                                                // setTodoValue(item.todo);
                                            }}>
                                            <Text style={{ alignSelf: 'flex-end', color: 'green', fontSize: 30, fontWeight: '800' }}>…</Text>
                                        </TouchableOpacity> */}

                      <TouchableOpacity
                        onPress={() => {
                          if (item) {
                            navigation.navigate('EditNote', item);
                          }
                        }}>
                        <Text
                          style={{
                            alignSelf: 'flex-end',
                            color: 'green',
                            fontSize: 30,
                            fontWeight: '800',
                          }}>
                          …
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => deleteNote(item.id)}>
                        <Image
                          source={require('../../assets/delete.png')}
                          style={{
                            tintColor: 'red',
                            height: 20,
                            width: 20,
                            alignSelf: 'flex-end',
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            style={styles.upButton}
            onPress={() => navigation.navigate('NewNote')}>
            <Image
              source={require('../../assets/plus.png')}
              style={{height: 22, width: 22}}
              tintColor={'white'}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  txtinput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    fontSize: 18,
    paddingLeft: 22,
    margin: 3,
    elevation: 1,
  },
  btn: {
    margin: 3,
    marginVertical: 8,
    justifyContent: 'center',
    backgroundColor: '#0f2064',
    height: 55,
    width: 'auto',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardSideView: {
    flex: 1,
    height: 'auto',
    marginVertical: 10,
    backgroundColor: 'coral',
    margin: 8,
    borderRadius: 22,
  },
  todoDate: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  todoTitle: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: '700',
  },
  todoTxt: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '400',
  },
  upButton: {
    position: 'absolute',
    bottom: 18,
    right: 20,
    backgroundColor: '#0f2064',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upButtonText: {
    fontSize: 39,
    color: 'white',
  },
});
