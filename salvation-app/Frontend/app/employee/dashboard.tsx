import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";

export default function Dashboard(){
  return(
    <View style={styles.container}>

      {/* STATUS BAR */}
      <StatusBar style="light" backgroundColor="#0A1F44" />

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <BackButton />
        <Text style={styles.navTitle}>Employee Dashboard</Text>
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:30}}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.name}>Employee</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="document-text-outline" size={28} color="#0A1F44" />
            <Text style={styles.statTitle}>Salary Slips</Text>
            <Text style={styles.statSub}>View & Download</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="folder-open-outline" size={28} color="#0A1F44" />
            <Text style={styles.statTitle}>Documents</Text>
            <Text style={styles.statSub}>Personal Files</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <MaterialIcons name="account-circle" size={48} color="#0A1F44" />
          <View style={{marginLeft:12}}>
            <Text style={styles.profileName}>Employee Name</Text>
            <Text style={styles.profileRole}>Designation</Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="receipt-outline" size={24} color="#ffffff" />
          <Text style={styles.actionText}>View Salary Slip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="person-outline" size={24} color="#ffffff" />
          <Text style={styles.actionText}>Profile Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="document-attach-outline" size={24} color="#ffffff" />
          <Text style={styles.actionText}>My Documents</Text>
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
    paddingTop:48,
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

  /* HEADER */
  header:{
    padding:20,
    paddingBottom:10
  },
  welcome:{
    fontSize:14,
    color:"#757575"
  },
  name:{
    fontSize:24,
    fontWeight:"700",
    color:"#0A1F44",
    marginTop:4
  },

  /* STATS */
  statsRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:20,
    marginTop:10
  },
  statCard:{
    width:"48%",
    backgroundColor:"#ffffff",
    borderRadius:16,
    padding:16,
    alignItems:"center",
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:8,
    elevation:4
  },
  statTitle:{
    fontSize:16,
    fontWeight:"600",
    marginTop:8,
    color:"#263238"
  },
  statSub:{
    fontSize:12,
    color:"#757575",
    marginTop:2
  },

  /* PROFILE */
  profileCard:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#ffffff",
    marginHorizontal:20,
    marginTop:20,
    borderRadius:16,
    padding:16,
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:8,
    elevation:4
  },
  profileName:{
    fontSize:16,
    fontWeight:"600",
    color:"#263238"
  },
  profileRole:{
    fontSize:13,
    color:"#757575",
    marginTop:2
  },

  /* ACTIONS */
  actionCard:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#0A1F44",
    marginHorizontal:20,
    marginTop:15,
    borderRadius:14,
    padding:16
  },
  actionText:{
    color:"#ffffff",
    fontSize:15,
    fontWeight:"600",
    marginLeft:12
  }
});
