import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEmployeeProfile } from "../../api/employeeApi";

export default function Dashboard(){
  const [loading,setLoading]=useState(true);
  const [employeeId,setEmployeeId]=useState("XXXX");
  const [employeeName,setEmployeeName]=useState("Employee Name");

  /* ---------- LOAD PROFILE ---------- */
  useEffect(()=>{
    const loadProfile=async()=>{
      try{
        const storedEmpId=await AsyncStorage.getItem("employeeId");

        if(!storedEmpId){
          setLoading(false);
          return;
        }

        setEmployeeId(storedEmpId);

        const res=await getEmployeeProfile(storedEmpId);

        if(res?.employee){
          setEmployeeName(
            res.employee.fullName?.trim() || "Employee Name"
          );
        }

      }catch(err){
        console.log("⚠️ Dashboard profile fetch failed");
      }finally{
        setLoading(false);
      }
    };

    loadProfile();
  },[]);

  if(loading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0A1F44"/>
      </View>
    );
  }

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
          <Text style={styles.name}>{employeeName}</Text>
          <Text style={styles.empId}>Employee ID: {employeeId}</Text>
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
            <Text style={styles.profileName}>{employeeName}</Text>
            <Text style={styles.profileRole}>Employee</Text>
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

/* ---------- STYLES ---------- */
const styles=StyleSheet.create({
  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f4f6f8"
  },
  container:{flex:1,backgroundColor:"#f4f6f8"},
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
