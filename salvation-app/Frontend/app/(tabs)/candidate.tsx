import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  Animated
} from "react-native";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import {
  createCandidateApi,
  getCandidateByMobileApi
} from "../../api/candidateApi";

export default function Candidate(){
  /* ================= FORM STATES ================= */
  const [fullName,setFullName]=useState("");
  const [fatherName,setFatherName]=useState("");
  const [address,setAddress]=useState("");
  const [mobile,setMobile]=useState("");

  const [resume,setResume]=useState<any>(null);
  const [aadhaar,setAadhaar]=useState<any>(null);

  /* ================= UI STATES ================= */
  const [loading,setLoading]=useState(false);
  const [popupVisible,setPopupVisible]=useState(false);
  const [popupType,setPopupType]=useState<
    "success" | "error" | "exists"
  >("success");

  const scaleAnim=useRef(new Animated.Value(0)).current;

  /* ================= PICK RESUME ================= */
  const pickResume=async()=>{
    const res=await DocumentPicker.getDocumentAsync({
      type:["application/pdf"],
      copyToCacheDirectory:true
    });
    if(!res.canceled){
      setResume(res.assets[0]);
    }
  };

  /* ================= PICK AADHAAR ================= */
  const pickAadhaar=async()=>{
    const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!permission.granted){
      Alert.alert("Permission Required","Please allow photo access");
      return;
    }
    const res=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      quality:0.7
    });
    if(!res.canceled){
      setAadhaar(res.assets[0]);
    }
  };

  /* ================= POPUP ================= */
  const openPopup=(type:"success"|"error"|"exists")=>{
    setPopupType(type);
    setPopupVisible(true);
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim,{
      toValue:1,
      useNativeDriver:true
    }).start();
  };

  const closePopup=()=>setPopupVisible(false);

  /* ================= SUBMIT ================= */
  const handleSubmit=async()=>{
    if(!fullName || !fatherName || !address || !mobile || !resume || !aadhaar){
      Alert.alert("Required","Please fill all fields and upload documents");
      return;
    }

    try{
      setLoading(true);

      /* 🔍 FINAL CHECK — IS NUMBER ALREADY REGISTERED? */
      try{
        await getCandidateByMobileApi(mobile);
        // If API succeeds → candidate already exists
        openPopup("exists");
        return;
      }catch{
        // 404 → not registered → continue
      }

      /* ✅ CREATE CANDIDATE */
      await createCandidateApi({
        fullName,
        fatherName,
        address,
        mobile,
        resume,
        aadhaar
      });

      openPopup("success");

      /* RESET FORM */
      setFullName("");
      setFatherName("");
      setAddress("");
      setMobile("");
      setResume(null);
      setAadhaar(null);

    }catch(err){
      openPopup("error");
    }finally{
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return(
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0A1F44" />

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <BackButton />
        <Text style={styles.navTitle}>Job Application Form</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:30}}>
        <Text style={styles.subtitle}>Please fill accurate details</Text>

        {/* PERSONAL INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          <TextInput
            placeholder="Father's Name"
            value={fatherName}
            onChangeText={setFatherName}
            style={styles.input}
          />

          <TextInput
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
          />

          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={[styles.input,{height:90}]}
          />
        </View>

        {/* DOCUMENTS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Document Uploads</Text>

          <TouchableOpacity style={styles.uploadBox} onPress={pickResume}>
            <Text style={styles.uploadText}>
              {resume ? resume.name : "Upload Resume (PDF)"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadBox} onPress={pickAadhaar}>
            <Text style={styles.uploadText}>
              {aadhaar ? "Aadhaar Selected" : "Upload Aadhaar Card"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* SUBMIT */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* POPUP */}
      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.popupOverlay}>
          <Animated.View style={[styles.popupBox,{transform:[{scale:scaleAnim}]}]}>

            <Text
              style={[
                styles.popupIcon,
                {color: popupType==="success" ? "#2e7d32" : "#c62828"}
              ]}
            >
              {popupType==="success" ? "✔" : "✖"}
            </Text>

            <Text style={styles.popupText}>
              {popupType==="success" && "Application Submitted Successfully"}
              {popupType==="exists" && "This mobile number is already registered"}
              {popupType==="error" && "Submission Failed"}
            </Text>

            <TouchableOpacity style={styles.popupClose} onPress={closePopup}>
              <Text style={{color:"#fff",fontWeight:"600"}}>Close</Text>
            </TouchableOpacity>

          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

/* ================= STYLES (UNCHANGED) ================= */
const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#f4f6f8"},
  navbar:{flexDirection:"row",alignItems:"center",paddingTop:48,paddingBottom:14,paddingHorizontal:20,backgroundColor:"#0A1F44",borderBottomLeftRadius:20,borderBottomRightRadius:20},
  navTitle:{fontSize:20,fontWeight:"700",color:"#fff",marginLeft:12},
  subtitle:{fontSize:14,color:"#757575",marginTop:16,marginHorizontal:20},
  card:{backgroundColor:"#fff",marginHorizontal:20,marginTop:16,borderRadius:16,padding:16,elevation:4},
  sectionTitle:{fontSize:16,fontWeight:"600",marginBottom:12},
  input:{borderWidth:1,borderColor:"#e0e0e0",borderRadius:12,paddingHorizontal:15,backgroundColor:"#fafafa",marginBottom:12,fontSize:15},
  uploadBox:{height:52,borderRadius:12,borderWidth:1,borderStyle:"dashed",borderColor:"#90a4ae",justifyContent:"center",alignItems:"center",marginBottom:12},
  uploadText:{color:"#546e7a",fontSize:14},
  submitButton:{marginTop:28,marginHorizontal:20,backgroundColor:"#0A1F44",height:54,borderRadius:14,justifyContent:"center",alignItems:"center"},
  submitText:{color:"#fff",fontSize:16,fontWeight:"600"},
  popupOverlay:{flex:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",alignItems:"center"},
  popupBox:{width:"80%",backgroundColor:"#fff",borderRadius:16,padding:24,alignItems:"center"},
  popupIcon:{fontSize:60,marginBottom:10},
  popupText:{fontSize:16,fontWeight:"600",textAlign:"center",marginBottom:20},
  popupClose:{backgroundColor:"#0A1F44",paddingHorizontal:24,paddingVertical:10,borderRadius:10}
});
