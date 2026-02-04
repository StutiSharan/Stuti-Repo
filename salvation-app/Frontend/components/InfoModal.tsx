import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InfoModalProps={
  visible:boolean;
  type?:"success"|"error"|"info";
  title:string;
  message:string;
  onClose:()=>void;
};

export default function InfoModal({
  visible,
  type="info",
  title,
  message,
  onClose
}:InfoModalProps){

  const iconMap={
    success:{ name:"checkmark-circle", color:"#2e7d32" },
    error:{ name:"close-circle", color:"#c62828" },
    info:{ name:"information-circle", color:"#0277bd" }
  };

  return(
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          <Ionicons
            name={iconMap[type].name as any}
            size={64}
            color={iconMap[type].color}
          />

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles=StyleSheet.create({
  overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"center",
    alignItems:"center"
  },
  modalBox:{
    width:"82%",
    backgroundColor:"#fff",
    borderRadius:18,
    padding:24,
    alignItems:"center"
  },
  title:{
    fontSize:18,
    fontWeight:"700",
    color:"#263238",
    marginTop:12,
    textAlign:"center"
  },
  message:{
    fontSize:14,
    color:"#607d8b",
    marginTop:6,
    textAlign:"center"
  },
  button:{
    marginTop:20,
    backgroundColor:"#0A1F44",
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius:12
  },
  buttonText:{
    color:"#fff",
    fontSize:15,
    fontWeight:"600"
  }
});
