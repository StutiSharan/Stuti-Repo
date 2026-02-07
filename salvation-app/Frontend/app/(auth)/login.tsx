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

  // ⏱ OTP timer
  useEffect(()=>{
    let interval:any;
    if(step==="OTP" && timer>0){
      interval=setInterval(()=>setTimer(t=>t-1),1000);
    }
    return()=>clearInterval(interval);
  },[step,timer]);

  // 🧹 Validators
  const validateName=()=>{
    const name=fullName.trim();
    if(!name)return "Name is required";
    if(name.length>32)return "Name can be max 32 characters";
    if(!/^[A-Za-z ]+$/.test(name))return "Name can contain only letters";
    return null;
  };

  const validatePhone=()=>{
    if(!/^\d{10}$/.test(phone))return "Phone number must be 10 digits";
    return null;
  };

  // 📩 SEND OTP
  const sendOtp=async()=>{
    const nameError=validateName();
    if(nameError){
      Alert.alert("Invalid Name",nameError);
      return;
    }

    const phoneError=validatePhone();
    if(phoneError){
      Alert.alert("Invalid Phone",phoneError);
      return;
    }

    try{
      setLoading(true);
      const formattedPhone=`+91${phone}`;
      await sendOtpApi(fullName.trim(),formattedPhone);
      setStep("OTP");
      setTimer(60);
      setOtp("");
    }catch(err:any){
      Alert.alert("Error",err.message);
    }finally{
      setLoading(false);
    }
  };

  // 🔐 VERIFY OTP
  const verifyOtp=async()=>{
    if(otp.length!==6){
      Alert.alert("Invalid OTP","Enter 6-digit OTP");
      return;
    }
    try{
      setLoading(true);
      const formattedPhone=`+91${phone}`;
      await verifyOtpApi(formattedPhone,otp);
      router.replace("/(tabs)/candidate");
    }catch(err:any){
      Alert.alert("Error",err.message);
    }finally{
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const resendOtp=async()=>{
    try{
      setLoading(true);
      const formattedPhone=`+91${phone}`;
      await sendOtpApi(fullName.trim(),formattedPhone);
      setTimer(60);
      setOtp("");
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
              maxLength={32}
              onChangeText={t=>setFullName(t.replace(/[^A-Za-z ]/g,""))}
              style={styles.input}
            />

            <TextInput
              placeholder="Phone Number"
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={t=>setPhone(t.replace(/\D/g,""))}
              style={styles.input}
            />

            <Text style={styles.countryCode}>+91 will be added automatically</Text>

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
              onChangeText={t=>setOtp(t.replace(/\D/g,""))}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={verifyOtp}
              disabled={loading || timer===0}
            >
              <Text style={styles.buttonText}>
                {loading ? "Verifying..." : "Verify & Continue"}
              </Text>
            </TouchableOpacity>

            {timer>0 ? (
              <Text style={styles.timer}>OTP valid for {timer}s</Text>
            ):(
              <TouchableOpacity onPress={resendOtp}>
                <Text style={styles.resend}>Resend OTP</Text>
              </TouchableOpacity>
            )}
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
  input:{height:50,borderWidth:1,borderColor:"#e0e0e0",borderRadius:12,paddingHorizontal:15,fontSize:16,marginBottom:12,backgroundColor:"#fafafa"},
  countryCode:{fontSize:12,color:"#757575",marginBottom:10},
  button:{backgroundColor:"#0A1F44",height:50,borderRadius:12,justifyContent:"center",alignItems:"center"},
  buttonText:{color:"#fff",fontSize:16,fontWeight:"600"},
  timer:{marginTop:15,textAlign:"center",color:"#757575"},
  resend:{marginTop:15,textAlign:"center",color:"#0A1F44",fontWeight:"600"}
});
