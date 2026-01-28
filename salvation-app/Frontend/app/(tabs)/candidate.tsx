import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";

export default function Candidate(){
  return(
    <View style={styles.container}>

      {/* STATUS BAR FIX */}
      <StatusBar style="light" backgroundColor="#0A1F44" />
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <BackButton />
        <Text style={styles.navTitle}>New Candidate Form</Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:30}}
      >

        <Text style={styles.subtitle}>Please fill accurate details</Text>

        {/* Personal Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9e9e9e"
            style={styles.input}
          />

          <TextInput
            placeholder="Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            placeholderTextColor="#9e9e9e"
            style={styles.input}
          />
        </View>

        {/* Identity Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Identity Details</Text>

          <TextInput
            placeholder="Aadhar Number"
            keyboardType="number-pad"
            maxLength={12}
            placeholderTextColor="#9e9e9e"
            style={styles.input}
          />

          <TextInput
            placeholder="PAN Number"
            autoCapitalize="characters"
            placeholderTextColor="#9e9e9e"
            style={styles.input}
          />
        </View>

        {/* Education */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Education Documents</Text>

          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadText}>Upload 10th Marksheet (Optional)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadText}>Upload 12th Marksheet (Optional)</Text>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit Candidate Details</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f4f6f8"
  },

  /* NAVBAR */
  navbar:{
    flexDirection:"row",
    alignItems:"center",
    paddingTop:48,       // space from status bar
    paddingBottom:14,
    paddingHorizontal:20,
    backgroundColor:"#0A1F44",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  },
  navTitle:{
    fontSize:20,
    fontWeight:"700",
    color:"#ffffff",
    marginLeft:12
  },
  subtitle:{
    fontSize:14,
    color:"#757575",
    marginTop:16,
    marginHorizontal:20
  },

  /* CARDS */
  card:{
    backgroundColor:"#ffffff",
    marginHorizontal:20,
    marginTop:16,
    borderRadius:16,
    padding:16,
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:8,
    elevation:4
  },
  sectionTitle:{
    fontSize:16,
    fontWeight:"600",
    color:"#263238",
    marginBottom:12
  },
  input:{
    height:50,
    borderWidth:1,
    borderColor:"#e0e0e0",
    borderRadius:12,
    paddingHorizontal:15,
    fontSize:15,
    backgroundColor:"#fafafa",
    marginBottom:12
  },

  /* UPLOAD */
  uploadBox:{
    height:50,
    borderRadius:12,
    borderWidth:1,
    borderStyle:"dashed",
    borderColor:"#90a4ae",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:12,
    backgroundColor:"#f9fbfc"
  },
  uploadText:{
    color:"#546e7a",
    fontSize:14
  },

  /* SUBMIT */
  submitButton:{
    marginTop:28,
    marginHorizontal:20,
    backgroundColor:"#0A1F44",
    height:54,
    borderRadius:14,
    justifyContent:"center",
    alignItems:"center"
  },
  submitText:{
    color:"#ffffff",
    fontSize:16,
    fontWeight:"600"
  }
});
