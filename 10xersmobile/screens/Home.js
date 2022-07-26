import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../store/actionCreators/itemsCreators';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
  const {items, itemsLoading} = useSelector((state) => state.itemsReducer )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getItems())
  },[dispatch])

  if (itemsLoading) return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id})}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: item.image_url }}
        />
        <View style={{ marginTop: 15}}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text> Owned: </Text> 
            <Text style={styles.owned}> {item.total_sales}</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Welcome to</Text>
          <Text style={{fontSize: 38, color: "#B5E6E5", fontWeight: 'bold', textAlign: 'right'}}>
            NFT LIST
          </Text>
        </View>
      </View>
      <FlatList
        numColumns={2}
        style={styles.container}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding:4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginStart:15,
    marginEnd: 15
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 8,
    marginStart:5,
    marginEnd: 5
  },
  text: {
    fontWeight:'bold',
    textAlign: 'center'
  },
  owned: {
    color: '#00ced1',
    fontWeight:'bold',
    textAlign: 'center'
  },
  header: {
    marginTop: 30,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
})
export default HomeScreen;