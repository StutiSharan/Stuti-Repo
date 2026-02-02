import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { sendOtpApi, verifyOtpApi } from "../../api/authApi";

export default function Login(){
  const [step,setStep]=useState<"FORM"|"OTP">("FORM");
  const [timer,setTimer]=useState(60);
  const [otp,setOtp]=useState("");

  const [fullName,setFullName]=useState("");
  const [phone,setPhone]=useState("");
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    let interval:any;
    if(step==="OTP" && timer>0){
      interval=setInterval(()=>setTimer(t=>t-1),1000);
    }
    return()=>clearInterval(interval);
  },[step,timer]);

  // SEND OTP
  const sendOtp=async()=>{
    if(!fullName||!phone){
      Alert.alert("Error","Please enter name and phone number");
      return;
    }
    try{
      setLoading(true);
      await sendOtpApi(fullName,phone);
      setStep("OTP");
      setTimer(60);
    }catch(err:any){
      Alert.alert("Error",err.message);
    }finally{
      setLoading(false);
    }
  };

  // VERIFY OTP
  const verifyOtp=async()=>{
    if(otp.length!==6){
      Alert.alert("Invalid OTP","Enter 6-digit OTP");
      return;
    }
    try{
      setLoading(true);
      const res=await verifyOtpApi(phone,otp);

      // 🔐 Save token later (AsyncStorage)
      // await AsyncStorage.setItem("token",res.token);

      router.replace("/(tabs)/candidate");
    }catch(err:any){
      Alert.alert("Error",err.message);
    }finally{
      setLoading(false);
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {step==="FORM" ? "Candidate Login" : "Verify OTP"}
        </Text>

        {step==="FORM" && (
          <>
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />

            <TextInput
              placeholder="Phone Number"
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={sendOtp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Sending..." : "Send OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step==="OTP" && (
          <>
            <TextInput
              placeholder="Enter 6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={verifyOtp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Verifying..." : "Verify & Continue"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.timer}>
              {timer>0 ? `OTP valid for ${timer}s` : "OTP expired"}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#0A1F44",justifyContent:"center",padding:20},
  card:{backgroundColor:"#fff",borderRadius:16,padding:20,elevation:6},
  title:{fontSize:22,fontWeight:"700",color:"#0A1F44",marginBottom:20,textAlign:"center"},
  input:{height:50,borderWidth:1,borderColor:"#e0e0e0",borderRadius:12,paddingHorizontal:15,fontSize:16,marginBottom:15,backgroundColor:"#fafafa"},
  button:{backgroundColor:"#0A1F44",height:50,borderRadius:12,justifyContent:"center",alignItems:"center"},
  buttonText:{color:"#fff",fontSize:16,fontWeight:"600"},
  timer:{marginTop:15,textAlign:"center",color:"#757575"}
});
