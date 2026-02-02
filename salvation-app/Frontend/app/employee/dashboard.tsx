import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";
import { router } from "expo-router";

export default function Dashboard(){
  return(
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0A1F44" />

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <BackButton />
        <Text style={styles.navTitle}>Employee Dashboard</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.name}>Employee Name</Text>
          <Text style={styles.empId}>Employee ID: EMP-1023</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statCard} onPress={()=>router.push("/employee/my-documents")}>
            <Ionicons name="document-text-outline" size={28} color="#0A1F44" />
            <Text style={styles.statTitle}>Salary Slips</Text>
            <Text style={styles.statSub}>View & Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statCard} onPress={()=>router.push("/employee/my-documents")}>
            <Ionicons name="folder-open-outline" size={28} color="#0A1F44" />
            <Text style={styles.statTitle}>Documents</Text>
            <Text style={styles.statSub}>My Files</Text>
          </TouchableOpacity>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <MaterialIcons name="account-circle" size={48} color="#0A1F44" />
          <View style={{marginLeft:12}}>
            <Text style={styles.profileName}>Employee Name</Text>
            <Text style={styles.profileRole}>Designation</Text>
          </View>
        </View>

        {/* ACTIONS */}
        <TouchableOpacity style={styles.actionCard} onPress={()=>router.push("/employee/profile")}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Profile Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={()=>router.push("/employee/upload-documents")}>
          <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Upload Documents</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={()=>router.push("/employee/my-documents")}>
          <Ionicons name="document-attach-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>My Documents</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#f4f6f8"},
  navbar:{flexDirection:"row",alignItems:"center",paddingTop:48,paddingBottom:14,paddingHorizontal:20,backgroundColor:"#0A1F44",borderBottomLeftRadius:20,borderBottomRightRadius:20},
  navTitle:{fontSize:20,fontWeight:"700",color:"#fff",marginLeft:12},
  header:{padding:20},
  welcome:{fontSize:14,color:"#757575"},
  name:{fontSize:24,fontWeight:"700",color:"#0A1F44"},
  empId:{fontSize:13,color:"#607d8b",marginTop:4},
  statsRow:{flexDirection:"row",justifyContent:"space-between",marginHorizontal:20},
  statCard:{width:"48%",backgroundColor:"#fff",borderRadius:16,padding:16,alignItems:"center",elevation:4},
  statTitle:{fontSize:16,fontWeight:"600",marginTop:8},
  statSub:{fontSize:12,color:"#757575"},
  profileCard:{flexDirection:"row",alignItems:"center",backgroundColor:"#fff",margin:20,borderRadius:16,padding:16,elevation:4},
  profileName:{fontSize:16,fontWeight:"600"},
  profileRole:{fontSize:13,color:"#757575"},
  actionCard:{flexDirection:"row",alignItems:"center",backgroundColor:"#0A1F44",marginHorizontal:20,marginTop:15,borderRadius:14,padding:16},
  actionText:{color:"#fff",fontSize:15,fontWeight:"600",marginLeft:12}
});
