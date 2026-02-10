import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton(){
  const handleBack=()=>{
    if(router.canGoBack()) router.back();
    else router.replace("/(tabs)/candidate");
  };

  return(
    <TouchableOpacity style={styles.button} onPress={handleBack} hitSlop={10}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles=StyleSheet.create({
  button:{
    padding:4  
  }
});
