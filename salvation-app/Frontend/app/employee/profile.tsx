import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import BackButton from "../../components/BackButton";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Profile(){
  const [profileImage,setProfileImage]=useState<any>(null);

  const pickProfileImage=async()=>{
    const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!permission.granted){
      Alert.alert("Permission required","Please allow photo access");
      return;
    }

    const res=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect:[1,1],
      quality:0.7
    });

    if(res.canceled) return;

    setProfileImage(res.assets[0]);
  };

  return(
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0A1F44" />

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <BackButton />
        <Text style={styles.navTitle}>Profile Details</Text>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom:30}}>

        {/* PROFILE IMAGE */}
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickProfileImage} style={styles.avatarWrapper}>
            {profileImage ? (
              <Image source={{uri:profileImage.uri}} style={styles.avatar}/>
            ):(
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="camera-outline" size={28} color="#607d8b"/>
                <Text style={styles.avatarText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          {profileImage && (
            <TouchableOpacity onPress={pickProfileImage}>
              <Text style={styles.changePhoto}>Change Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* FORM */}
        <View style={styles.card}>
          <TextInput placeholder="Full Name" style={styles.input}/>
          <TextInput placeholder="Father's Name" style={styles.input}/>
          <TextInput placeholder="Mobile Number" keyboardType="number-pad" style={styles.input}/>
          <TextInput
            placeholder="Address"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={[styles.input,{height:90}]}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#f4f6f8"},

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
  navTitle:{fontSize:20,fontWeight:"700",color:"#fff",marginLeft:12},

  /* AVATAR */
  avatarContainer:{
    alignItems:"center",
    marginTop:20,
    marginBottom:10
  },
  avatarWrapper:{
    width:110,
    height:110,
    borderRadius:55,
    backgroundColor:"#e3f2fd",
    justifyContent:"center",
    alignItems:"center",
    overflow:"hidden",
    elevation:4
  },
  avatar:{
    width:"100%",
    height:"100%"
  },
  avatarPlaceholder:{
    justifyContent:"center",
    alignItems:"center"
  },
  avatarText:{
    fontSize:12,
    color:"#607d8b",
    marginTop:4
  },
  changePhoto:{
    marginTop:8,
    fontSize:13,
    color:"#0A1F44",
    fontWeight:"600"
  },

  /* CARD */
  card:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    marginTop:20,
    borderRadius:16,
    padding:16,
    elevation:4
  },
  input:{
    height:50,
    borderWidth:1,
    borderColor:"#e0e0e0",
    borderRadius:12,
    paddingHorizontal:15,
    marginBottom:12,
    backgroundColor:"#fafafa"
  },

  /* SAVE */
  saveBtn:{
    backgroundColor:"#0A1F44",
    height:52,
    marginHorizontal:20,
    marginTop:20,
    borderRadius:14,
    justifyContent:"center",
    alignItems:"center"
  },
  saveText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"600"
  }
});
