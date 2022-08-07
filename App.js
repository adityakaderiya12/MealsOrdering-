import { StyleSheet } from "react-native";
import { StatusBar } from "react-native-web";
import CategoriesScreen from "./screens/CategoriesScreen";

export default  function App(){
  return(

    <>
    <StatusBar style= 'light'/>

    <CategoriesScreen/>
    </>
  );
}
const styles =StyleSheet.create({
  container:{},
}
);
