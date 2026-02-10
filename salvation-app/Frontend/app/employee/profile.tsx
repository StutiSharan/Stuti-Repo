import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
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
} from "../../api/employeeApi";

export default function Profile() {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [mode, setMode] = useState<"VIEW" | "EDIT">("EDIT");

  const [profileImage, setProfileImage] = useState<any>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    (async () => {
      try {
        const empId = await AsyncStorage.getItem("employeeId");
        const token = await AsyncStorage.getItem("employeeToken");
        if (!empId || !token) return;

        setEmployeeId(empId);

        const res = await getEmployeeProfile(empId);
        const emp = res.employee;

        setFullName(emp.fullName || "");
        setMobile(emp.mobile || "");
        setAddress(emp.address || "");
        setEmail(emp.loginMobile || "");

        const hasData = emp.fullName || emp.mobile || emp.address;
        setMode(hasData ? "VIEW" : "EDIT");

        const photoRes = await getEmployeeProfilePhotoApi(empId, token);
        if (photoRes.profilePhoto) {
          setImageLoading(true);
          setProfileImage({
            uri: `${photoRes.profilePhoto}?t=${Date.now()}`,
          });
        }
      } catch {
        Alert.alert("Error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ================= PICK IMAGE ================= */
  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission required");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!res.canceled) {
      setImageLoading(false); // local image loads instantly
      setProfileImage(res.assets[0]);
    }
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    if (!fullName || !mobile || !address) {
      Alert.alert("Required", "Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      await updateEmployeeProfileApi(
        employeeId,
        (await AsyncStorage.getItem("employeeToken")) || "",
        {
          fullName,
          mobile,
          address,
          profilePhoto: profileImage?.uri?.startsWith("file://")
            ? profileImage
            : undefined,
        },
      );

      Alert.alert("Success", "Profile updated");
      setMode("VIEW");
    } catch {
      Alert.alert("Error", "Update failed");
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

      {/* HEADER */}
      <LinearGradient colors={["#1E3C72", "#2A5298"]} style={styles.header}>
        <View style={styles.navbar}>
          <BackButton />
          <Text style={styles.navTitle}>My Profile</Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* AVATAR */}
        <View style={styles.avatarSection}>
          {mode === "EDIT" ? (
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              <View style={styles.avatarOuter}>
                <View style={styles.avatarWrapper}>
                  {imageLoading && (
                    <ActivityIndicator
                      size="small"
                      color="#1E3C72"
                      style={styles.avatarLoader}
                    />
                  )}

                  <Image
                    source={
                      profileImage
                        ? { uri: profileImage.uri }
                        : require("../../assets/images/Myprofile.png")
                    }
                    style={[styles.avatar, imageLoading && { opacity: 0 }]}
                    resizeMode="cover"
                    onLoadEnd={() => setImageLoading(false)}
                  />
                </View>

                <View style={styles.cameraBadge}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.avatarWrapper}>
              {imageLoading && (
                <ActivityIndicator
                  size="small"
                  color="#1E3C72"
                  style={styles.avatarLoader}
                />
              )}

              <Image
                source={
                  profileImage
                    ? { uri: profileImage.uri }
                    : require("../../assets/images/Myprofile.png")
                }
                style={[styles.avatar, imageLoading && { opacity: 0 }]}
                resizeMode="cover"
                onLoadEnd={() => setImageLoading(false)}
              />
            </View>
          )}

          <Text style={styles.name}>{fullName || "Employee Name"}</Text>
        </View>

        {/* VIEW MODE */}
        {mode === "VIEW" && (
          <View style={styles.card}>
            <InfoRow icon="person-outline" value={fullName} />
            <InfoRow icon="call-outline" value={mobile} />
            <InfoRow icon="mail-outline" value={email} />
            <InfoRow icon="location-outline" value={address} />

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setMode("EDIT")}
            >
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* EDIT MODE */}
        {mode === "EDIT" && (
          <View style={styles.card}>
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
            <TextInput
              placeholder="Mobile"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              multiline
              style={[styles.input, { height: 80 }]}
            />

            <TouchableOpacity
              style={styles.editBtn}
              onPress={saveProfile}
              disabled={saving}
            >
              <Text style={styles.editText}>
                {saving ? "Saving..." : "Save Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* ================= SMALL COMPONENT ================= */

const InfoRow = ({ icon, value }: { icon: any; value: string }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={18} color="#1E3C72" />
    <Text style={styles.infoText}>{value || "-"}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    height: 150,
    paddingTop: 48,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  navbar: { flexDirection: "row", alignItems: "center" },
  navTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginLeft: 8 },

  avatarSection: { alignItems: "center", marginTop: 20 },
  name: { fontSize: 18, fontWeight: "700", marginTop: 10 },

  avatarOuter: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: { width: "100%", height: "100%", borderRadius: 55 },

  avatarLoader: { position: "absolute", zIndex: 10 },

  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1E3C72",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 18,
    padding: 18,
    elevation: 4,
  },

  infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#263238",
  },

  editBtn: {
    marginTop: 20,
    backgroundColor: "#1E3C72",
    height: 46,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  editText: { color: "#fff", fontSize: 14, fontWeight: "700" },

  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
});
