import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";


export default function Employee(){
  return(
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0A1F44" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="briefcase" size={42} color="#ffffff" />
        <Text style={styles.brand}>Employee Portal</Text>
        <Text style={styles.subtitle}>Authorized access only</Text>
      </View>

      {/* Login Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Employee Login</Text>

        <View style={styles.inputBox}>
          <Ionicons name="id-card-outline" size={20} color="#607d8b" />
          <TextInput
            placeholder="Employee ID"
            placeholderTextColor="#9e9e9e"
            style={styles.input}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#607d8b" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9e9e9e"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={()=>router.push("/employee/dashboard")}
        >
          <Text style={styles.buttonText}>Login to Dashboard</Text>
        </TouchableOpacity>

        <Text style={styles.info}>
          Contact HR if you forgot your credentials
        </Text>
      </View>
    </View>
  );
}
const styles=StyleSheet.create({
container:{
  flex:1,
  backgroundColor:"#0A1F44",
  justifyContent:"center",
  padding:20,
  paddingBottom:80   // 👈 IMPORTANT: fills space behind floating tabs
},
  header:{
    alignItems:"center",
    marginBottom:30
  },
  brand:{
    fontSize:24,
    fontWeight:"700",
    color:"#ffffff",
    marginTop:10
  },
  subtitle:{
    fontSize:14,
    color:"#cfd8dc",
    marginTop:4
  },
  card:{
    backgroundColor:"#ffffff",
    borderRadius:18,
    padding:20,
    shadowColor:"#000",
    shadowOpacity:0.15,
    shadowRadius:10,
    elevation:6
  },
  title:{
    fontSize:22,
    fontWeight:"700",
    color:"#0A1F44",
    marginBottom:20,
    textAlign:"center"
  },
  inputBox:{
    flexDirection:"row",
    alignItems:"center",
    borderWidth:1,
    borderColor:"#e0e0e0",
    borderRadius:12,
    paddingHorizontal:12,
    marginBottom:15,
    backgroundColor:"#fafafa",
    height:50
  },
  input:{
    flex:1,
    marginLeft:10,
    fontSize:16,
    color:"#263238"
  },
  button:{
    backgroundColor:"#0A1F44",
    height:52,
    borderRadius:14,
    justifyContent:"center",
    alignItems:"center",
    marginTop:10
  },
  buttonText:{
    color:"#ffffff",
    fontSize:16,
    fontWeight:"600"
  },
  info:{
    marginTop:15,
    textAlign:"center",
    fontSize:13,
    color:"#757575"
  }
});
