import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { detailItem } from "../store/actionCreators/itemsCreators";

const DetailScreen = () => {
  const {item, itemsLoading} = useSelector((state) => state.itemsReducer);
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(detailItem(id))
  },[dispatch,id])
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [15, 25, 40, 20, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Chart 30 Days"] // optional
  };
  const screenWidth = Dimensions.get("window").width/1.15;
  const chartConfig = {

    color: (opacity = 1) => `white`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  
  if (itemsLoading) return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: item.image_url }}
        />
        <View style={{ marginTop: 15, marginBottom: 15}}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      <View style={styles.containerBox}>
        <View style={styles.square}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Owned</Text>
          <Text style={{textAlign: 'center'}}>{item.total_sales}</Text>
        </View>
        <View style={styles.square}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Volume</Text>
          <Text style={{textAlign: 'center'}}>{Math.floor(item.total_volume)}</Text>
        </View>
        <View style={styles.square}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>1 Day</Text>
          <Text style={{textAlign: 'center'}}>{Math.round(item.one_day_change)}%</Text>
        </View>
        <View>
        </View>
      </View>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding:4,
    flex: 1,
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
    marginStart: 15,
    marginEnd: 15
  },
  image: {
    width: 150,
    height: 150,
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
  containerBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#d9f3f9',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  square: {
    backgroundColor: 'white',
    width: 80,
    height: 50,
    margin: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  }
})
export default DetailScreen;