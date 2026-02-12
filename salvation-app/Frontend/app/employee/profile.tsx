import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Dimensions,
  Linking,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import BackButton from "../../components/BackButton";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEmployeeProfile,
  updateEmployeeProfileApi,
  getEmployeeProfilePhotoApi,
  getEmployeeDocumentsApi,
} from "../../api/employeeApi";

const WIDTH = Dimensions.get("window").width;

type DocItem = {
  key: string;
  url: string;
  type: "image" | "pdf";
};

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [docLoading, setDocLoading] = useState(true);

  const [mode, setMode] = useState<"VIEW" | "EDIT">("VIEW");

  const [employeeId, setEmployeeId] = useState("");
  const [token, setToken] = useState("");

  const [profileImage, setProfileImage] = useState<any>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
const DOC_CACHE_KEY = "EMPLOYEE_DOC_CACHE";
const PHOTO_CACHE_KEY = "EMPLOYEE_PROFILE_PHOTO";

useEffect(() => {
  (async () => {
    try {
      const empId = await AsyncStorage.getItem("employeeId");
      const tok = await AsyncStorage.getItem("employeeToken");
      if (!empId || !tok) return;

      setEmployeeId(empId);
      setToken(tok);

      /* ---------------- PROFILE ---------------- */
      const profileRes = await getEmployeeProfile(empId);
      const emp = profileRes.employee;

      setFullName(emp.fullName || "");
      setMobile(emp.mobile || "");
      setEmail(emp.loginMobile || "");
      setAddress(emp.address || "");

      /* ---------------- PROFILE PHOTO (CACHE) ---------------- */
      const cachedPhoto = await AsyncStorage.getItem(PHOTO_CACHE_KEY);

      if (cachedPhoto) {
        setProfileImage({ uri: cachedPhoto });
      } else {
        const photoRes = await getEmployeeProfilePhotoApi(empId, tok);
        if (photoRes?.profilePhoto) {
          setProfileImage({ uri: photoRes.profilePhoto });
          await AsyncStorage.setItem(
            PHOTO_CACHE_KEY,
            photoRes.profilePhoto
          );
        }
      }

      /* ---------------- DOCUMENTS (CACHE) ---------------- */
      const cachedDocs = await AsyncStorage.getItem(DOC_CACHE_KEY);

      if (cachedDocs) {
        setDocuments(JSON.parse(cachedDocs));
        setDocLoading(false);
      } else {
        const docsRes = await getEmployeeDocumentsApi(empId, tok);

        const flat: DocItem[] = [];
        const pushDocs = (obj: any) => {
          Object.entries(obj || {}).forEach(([key, url]) => {
            if (!url || typeof url !== "string") return;
            flat.push({
              key,
              url,
              type: url.toLowerCase().includes(".pdf") ? "pdf" : "image",
            });
          });
        };

        pushDocs(docsRes.personal);
        pushDocs(docsRes.letters);
        pushDocs(docsRes.government);

        if (docsRes.salarySlips?.length) {
          docsRes.salarySlips.forEach((u: string, i: number) =>
            flat.push({ key: `salary_${i}`, url: u, type: "pdf" })
          );
        }

        setDocuments(flat);
        await AsyncStorage.setItem(DOC_CACHE_KEY, JSON.stringify(flat));
      }
    } catch {
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setLoading(false);
      setDocLoading(false);
    }
  })();
}, []);


  /* ================= PICK IMAGE ================= */
  const pickImage = async () => {
    if (mode !== "EDIT") return;

    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!res.canceled) {
      setProfileImage(res.assets[0]);
      setImageLoading(false);
    }
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    if (!fullName || !mobile || !email || !address) {
      Alert.alert("Required", "All fields are required");
      return;
    }

    try {
      setSaving(true);

     await updateEmployeeProfileApi(employeeId, token, {
  fullName,
  mobile,
  address,
  profilePhoto:
    profileImage?.uri?.startsWith("file://") ? profileImage : undefined,
});

/* 🔥 CLEAR CACHE */
await AsyncStorage.removeItem(PHOTO_CACHE_KEY);

Alert.alert("Success", "Profile updated");
setMode("VIEW");

    } catch {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E3C72" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient colors={["#1E3C72", "#2A5298"]} style={styles.header}>
        <View style={styles.navbar}>
          <BackButton />
          <Text style={styles.navTitle}>My Profile</Text>
        </View>
      </LinearGradient>

      <ScrollView>
        {/* AVATAR */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
            <View style={styles.avatarWrapper}>
              {imageLoading && (
                <View style={styles.avatarLoader}>
                  <ActivityIndicator size="small" color="#1E3C72" />
                </View>
              )}
              <Image
                source={
                  profileImage
                    ? { uri: profileImage.uri }
                    : require("../../assets/images/Myprofile.png")
                }
                style={[styles.avatar, imageLoading && { opacity: 0 }]}
                onLoadEnd={() => setImageLoading(false)}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{fullName || "Employee"}</Text>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.card}>
          {mode === "EDIT" ? (
            <>
              <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full Name" />
              <TextInput style={styles.input} value={mobile} onChangeText={setMobile} placeholder="Mobile" keyboardType="number-pad" />
              <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
              <TextInput style={[styles.input,{height:80}]} value={address} onChangeText={setAddress} placeholder="Address" multiline />

              <TouchableOpacity style={styles.editBtn} onPress={saveProfile} disabled={saving}>
                <Text style={styles.editText}>{saving ? "Saving..." : "Save Profile"}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <InfoRow icon="person-outline" value={fullName} />
              <InfoRow icon="call-outline" value={mobile} />
              <InfoRow icon="mail-outline" value={email} />
              <InfoRow icon="location-outline" value={address} />

              <TouchableOpacity style={styles.editBtn} onPress={() => setMode("EDIT")}>
                <Text style={styles.editText}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* DOCUMENT GALLERY */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>My Documents</Text>

          {docLoading ? (
            <ActivityIndicator />
          ) : documents.length === 0 ? (
            <Text style={styles.empty}>No documents uploaded</Text>
          ) : (
            <View style={styles.grid}>
              {documents.map((doc) => (
                <TouchableOpacity
                  key={doc.key}
                  style={styles.item}
                  onPress={() =>
                    doc.type === "pdf"
                      ? Linking.openURL(doc.url)
                      : setPreviewImage(doc.url)
                  }
                >
                  <View style={styles.itemInner}>
                    {doc.type === "image" ? (
                      <Image source={{ uri: doc.url }} style={styles.thumb} />
                    ) : (
                      <>
                        <Ionicons name="document-text" size={36} color="#E53935" />
                        <Text style={styles.pdfText}>PDF</Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* IMAGE PREVIEW */}
      {previewImage && (
        <View style={styles.preview}>
          <TouchableOpacity style={styles.close} onPress={() => setPreviewImage(null)}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: previewImage }} style={styles.previewImage} resizeMode="contain" />
        </View>
      )}
    </View>
  );
}

/* ================= SMALL ================= */
const InfoRow = ({ icon, value }: any) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#1E3C72" />
    <Text style={styles.infoText}>{value || "-"}</Text>
  </View>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#F4F6FA"},
  loader:{flex:1,justifyContent:"center",alignItems:"center"},
  header:{height:120,paddingTop:50,paddingHorizontal:20,borderBottomLeftRadius:26,borderBottomRightRadius:26},
  navbar:{flexDirection:"row",alignItems:"center"},
  navTitle:{color:"#fff",fontSize:18,fontWeight:"700",marginLeft:8},

  avatarSection:{alignItems:"center",marginTop:20},
  name:{fontSize:18,fontWeight:"700",marginTop:10},
  avatarWrapper:{
    width:110,
    height:110,
    borderRadius:55,
    overflow:"hidden",
    backgroundColor:"#fff",
    elevation:6,
    justifyContent:"center",
    alignItems:"center"
  },
  avatar:{width:"100%",height:"100%"},
  avatarLoader:{
    position:"absolute",
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center",
    zIndex:10
  },

  card:{backgroundColor:"#fff",margin:20,borderRadius:18,padding:18,elevation:4},
  infoRow:{flexDirection:"row",alignItems:"center",paddingVertical:8},
  infoText:{marginLeft:12,fontWeight:"600"},

  input:{borderWidth:1,borderColor:"#e0e0e0",borderRadius:12,padding:12,marginBottom:12,backgroundColor:"#fafafa"},
  editBtn:{marginTop:16,backgroundColor:"#1E3C72",height:46,borderRadius:24,justifyContent:"center",alignItems:"center"},
  editText:{color:"#fff",fontWeight:"700"},

  sectionTitle:{fontSize:16,fontWeight:"700",marginBottom:12},
  grid:{flexDirection:"row",flexWrap:"wrap"},
  item:{width:"33.333%",padding:6},
  itemInner:{height:100,borderRadius:10,backgroundColor:"#F4F6FA",justifyContent:"center",alignItems:"center",overflow:"hidden"},
  thumb:{width:"100%",height:"100%"},
  pdfText:{fontSize:11,marginTop:4,fontWeight:"600",color:"#E53935"},
  empty:{textAlign:"center",color:"#90a4ae"},

  preview:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.9)",justifyContent:"center",alignItems:"center"},
  previewImage:{width:"90%",height:"80%"},
  close:{position:"absolute",top:50,right:20},
});
