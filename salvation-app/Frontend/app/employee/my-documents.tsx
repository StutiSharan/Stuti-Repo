import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const DocItem=({name}:{name:string})=>(
  <TouchableOpacity style={styles.docItem}>
    <Ionicons name="document-outline" size={20} color="#0A1F44"/>
    <Text style={styles.docText}>{name}</Text>
  </TouchableOpacity>
);

export default function MyDocuments(){
  return(
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0A1F44"/>

      <View style={styles.navbar}>
        <BackButton />
        <Text style={styles.navTitle}>My Documents</Text>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom:30}}>
        <View style={styles.card}>
          <Text style={styles.section}>Salary Slips</Text>
          <DocItem name="January 2024.pdf"/>
          <DocItem name="February 2024.pdf"/>

          <Text style={styles.section}>Letters</Text>
          <DocItem name="Offer Letter.pdf"/>
          <DocItem name="Appointment Letter.pdf"/>

          <Text style={styles.section}>Government</Text>
          <DocItem name="ESIC Slip.pdf"/>
          <DocItem name="UAN Letter.pdf"/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#f4f6f8"},
  navbar:{flexDirection:"row",alignItems:"center",paddingTop:48,paddingBottom:14,paddingHorizontal:20,backgroundColor:"#0A1F44"},
  navTitle:{fontSize:20,fontWeight:"700",color:"#fff",marginLeft:12},
  card:{backgroundColor:"#fff",margin:20,borderRadius:16,padding:16,elevation:4},
  section:{fontSize:16,fontWeight:"700",marginVertical:10,color:"#263238"},
  docItem:{flexDirection:"row",alignItems:"center",paddingVertical:8},
  docText:{marginLeft:10,color:"#37474f"}
});
