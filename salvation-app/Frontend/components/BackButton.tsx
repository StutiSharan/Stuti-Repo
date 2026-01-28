import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton(){
  const handleBack=()=>{
    if(router.canGoBack())router.back();
    else router.replace("/(tabs)/candidate");
  };

  return(
    <TouchableOpacity style={styles.button} onPress={handleBack}>
      <Ionicons name="arrow-back" size={20} color="#0A1F44" />
    </TouchableOpacity>
  );
}

const styles=StyleSheet.create({
  button:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:"#ffffff",
    justifyContent:"center",
    alignItems:"center",
    shadowColor:"#000",
    shadowOpacity:0.15,
    shadowRadius:6,
    elevation:4
  }
});
