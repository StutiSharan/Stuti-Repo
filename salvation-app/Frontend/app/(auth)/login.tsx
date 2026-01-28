import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

const STATIC_OTP=process.env.EXPO_PUBLIC_STATIC_OTP;

export default function Login(){
  const [step,setStep]=useState<"FORM"|"OTP">("FORM");
  const [timer,setTimer]=useState(60);
  const [otp,setOtp]=useState("");

  useEffect(()=>{
    let interval:any;
    if(step==="OTP" && timer>0){
      interval=setInterval(()=>setTimer(t=>t-1),1000);
    }
    return()=>clearInterval(interval);
  },[step,timer]);

  const sendOtp=()=>{
    setStep("OTP");
    setTimer(60);
  };

  const verifyOtp=()=>{
    if(otp!==STATIC_OTP){
      Alert.alert("Invalid OTP","Please enter correct OTP");
      return;
    }
    router.replace("/(tabs)/candidate");
  };

  return(
    <View style={styles.container}>
    
      <View style={styles.card}>
        <Text style={styles.title}>
          {step==="FORM" ? "Candidate Login" : "Verify OTP"}
        </Text>

        {step==="FORM" && (
          <>
            <TextInput placeholder="Full Name" style={styles.input} />
            <TextInput placeholder="Phone Number" keyboardType="number-pad" maxLength={10} style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={sendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
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

            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify & Continue</Text>
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
  header:{alignItems:"center",marginBottom:30},
  brand:{fontSize:26,fontWeight:"800",color:"#fff"},
  subtitle:{fontSize:14,color:"#cfd8dc",marginTop:4},
  card:{backgroundColor:"#fff",borderRadius:16,padding:20,elevation:6},
  title:{fontSize:22,fontWeight:"700",color:"#0A1F44",marginBottom:20,textAlign:"center"},
  input:{height:50,borderWidth:1,borderColor:"#e0e0e0",borderRadius:12,paddingHorizontal:15,fontSize:16,marginBottom:15,backgroundColor:"#fafafa"},
  button:{backgroundColor:"#0A1F44",height:50,borderRadius:12,justifyContent:"center",alignItems:"center"},
  buttonText:{color:"#fff",fontSize:16,fontWeight:"600"},
  timer:{marginTop:15,textAlign:"center",color:"#757575"}
});
