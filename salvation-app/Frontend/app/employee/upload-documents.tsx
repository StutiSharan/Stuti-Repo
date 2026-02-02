import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";

const Doc=({label}:{label:string})=>(
  <TouchableOpacity style={styles.uploadBox}>
    <Text style={styles.uploadText}>{label}</Text>
  </TouchableOpacity>
);

export default function UploadDocuments(){
  return(
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0A1F44"/>

      <View style={styles.navbar}>
        <BackButton />
        <Text style={styles.navTitle}>Upload Documents</Text>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom:30}}>
        <View style={styles.card}>
          <Doc label="Upload Aadhaar Card"/>
          <Doc label="Upload PAN Card"/>
          <Doc label="Upload Bank Passbook"/>
          <Doc label="Upload 10th Marksheet (Optional)"/>
          <Doc label="Upload 12th Marksheet (Optional)"/>
          <Doc label="Upload Profile Photo"/>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Documents</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#f4f6f8"},
  navbar:{flexDirection:"row",alignItems:"center",paddingTop:48,paddingBottom:14,paddingHorizontal:20,backgroundColor:"#0A1F44"},
  navTitle:{fontSize:20,fontWeight:"700",color:"#fff",marginLeft:12},
  card:{backgroundColor:"#fff",margin:20,borderRadius:16,padding:16,elevation:4},
  uploadBox:{height:52,borderRadius:12,borderWidth:1,borderStyle:"dashed",borderColor:"#90a4ae",justifyContent:"center",alignItems:"center",marginBottom:12},
  uploadText:{color:"#546e7a"},
  saveBtn:{backgroundColor:"#0A1F44",height:52,marginHorizontal:20,borderRadius:14,justifyContent:"center",alignItems:"center"},
  saveText:{color:"#fff",fontSize:16,fontWeight:"600"}
});
