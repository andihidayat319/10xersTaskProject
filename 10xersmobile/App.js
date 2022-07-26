import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./screens/Detail";
import HomeScreen from "./screens/Home";
import {Provider} from "react-redux"
import store from "./store/store";

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Detail" component={DetailScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};
export default App;