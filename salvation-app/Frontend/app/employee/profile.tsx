import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEmployeeProfile,
  updateEmployeeProfile
} from "../../api/employeeApi";

/* ================= PROFILE SCREEN ================= */
export default function Profile(){
  const [employeeId,setEmployeeId]=useState("");

  const [fullName,setFullName]=useState("");
  const [fatherName,setFatherName]=useState("");
  const [mobile,setMobile]=useState("");
  const [address,setAddress]=useState("");

  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);

  // VIEW → show card, EDIT → show form
  const [mode,setMode]=useState<"VIEW"|"EDIT">("VIEW");

  /* ---------- LOAD PROFILE ---------- */
  useEffect(()=>{
    const loadProfile=async()=>{
      try{
        const empId=await AsyncStorage.getItem("employeeId");
        if(!empId){
          Alert.alert("Session expired","Please login again");
          return;
        }

        setEmployeeId(empId);

        const res=await getEmployeeProfile(empId);
        const emp=res.employee;

        const hasProfile =
          emp.fullName || emp.fatherName || emp.mobile || emp.address;

        setFullName(emp.fullName || "");
        setFatherName(emp.fatherName || "");
        setMobile(emp.mobile || "");
        setAddress(emp.address || "");

        setMode(hasProfile ? "VIEW" : "EDIT");

      }catch(err){
        Alert.alert("Error","Failed to load profile");
      }finally{
        setLoading(false);
      }
    };

    loadProfile();
  },[]);

  /* ---------- SAVE PROFILE ---------- */
  const saveProfile=async()=>{
    if(!fullName||!fatherName||!mobile||!address){
      Alert.alert("Required","Please fill all fields");
      return;
    }

    try{
      setSaving(true);

      await updateEmployeeProfile(employeeId,{
        fullName,
        fatherName,
        mobile,
        address
      });

      Alert.alert("Success","Profile saved successfully");
      setMode("VIEW");

    }catch(err:any){
      Alert.alert("Error",err.message||"Update failed");
    }finally{
      setSaving(false);
    }
  };

  /* ---------- LOADER ---------- */
  if(loading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0A1F44"/>
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0A1F44"/>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <BackButton/>
        <Text style={styles.navTitle}>Profile Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Ionicons name="person" size={46} color="#607d8b"/>
          </View>
          <Text style={styles.avatarText}>Profile Photo (Coming Soon)</Text>
        </View>

        {/* ================= VIEW MODE ================= */}
        {mode==="VIEW" && (
          <View style={styles.profileCard}>

            {/* CARD HEADER */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Profile Information</Text>
              <TouchableOpacity onPress={()=>setMode("EDIT")}>
                <Ionicons name="create-outline" size={22} color="#0A1F44"/>
              </TouchableOpacity>
            </View>

            <InfoRow label="Full Name" value={fullName}/>
            <Divider/>
            <InfoRow label="Father's Name" value={fatherName}/>
            <Divider/>
            <InfoRow label="Mobile Number" value={mobile}/>
            <Divider/>
            <InfoRow label="Address" value={address} multiline/>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={()=>setMode("EDIT")}
            >
              <Ionicons name="create-outline" size={18} color="#fff"/>
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ================= EDIT MODE ================= */}
        {mode==="EDIT" && (
          <>
            <View style={styles.formCard}>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                style={styles.input}
              />
              <TextInput
                value={fatherName}
                onChangeText={setFatherName}
                placeholder="Father's Name"
                style={styles.input}
              />
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder="Mobile Number"
                keyboardType="number-pad"
                style={styles.input}
              />
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                multiline
                style={[styles.input,{height:90}]}
              />
            </View>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={saveProfile}
              disabled={saving}
            >
              <Text style={styles.saveText}>
                {saving?"Saving...":"Save Profile"}
              </Text>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
    </View>
  );
}

/* ================= SMALL COMPONENTS ================= */
const InfoRow=({
  label,value,multiline=false
}:{label:string;value:string;multiline?:boolean})=>(
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text
      style={[
        styles.infoValue,
        multiline && {lineHeight:20}
      ]}
    >
      {value || "-"}
    </Text>
  </View>
);

const Divider=()=>(
  <View style={styles.divider}/>
);

/* ================= STYLES ================= */
const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#f4f6f8"},
  loader:{flex:1,justifyContent:"center",alignItems:"center"},

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

  avatarContainer:{alignItems:"center",marginTop:20},
  avatarWrapper:{
    width:110,
    height:110,
    borderRadius:55,
    backgroundColor:"#e3f2fd",
    justifyContent:"center",
    alignItems:"center",
    elevation:4
  },
  avatarText:{marginTop:8,fontSize:13,color:"#757575"},

  profileCard:{
    backgroundColor:"#fff",
    margin:20,
    borderRadius:18,
    padding:18,
    elevation:5
  },
  cardHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:16
  },
  cardTitle:{
    fontSize:17,
    fontWeight:"700",
    color:"#0A1F44"
  },

  infoRow:{paddingVertical:10},
  infoLabel:{fontSize:13,color:"#78909c"},
  infoValue:{fontSize:15,fontWeight:"600",color:"#263238",marginTop:4},
  divider:{height:1,backgroundColor:"#eceff1"},

  editBtn:{
    marginTop:20,
    backgroundColor:"#0A1F44",
    height:48,
    borderRadius:12,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  editText:{color:"#fff",fontSize:15,fontWeight:"600",marginLeft:8},

  formCard:{
    backgroundColor:"#fff",
    margin:20,
    borderRadius:18,
    padding:16,
    elevation:5
  },
  input:{
    borderWidth:1,
    borderColor:"#e0e0e0",
    borderRadius:12,
    padding:12,
    marginBottom:12,
    backgroundColor:"#fafafa"
  },

  saveBtn:{
    backgroundColor:"#0A1F44",
    height:52,
    marginHorizontal:20,
    borderRadius:14,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:30
  },
  saveText:{color:"#fff",fontSize:16,fontWeight:"600"}
});
