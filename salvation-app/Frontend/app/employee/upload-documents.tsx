import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../components/BackButton";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { uploadEmployeeDocumentsApi } from "../../api/employeeApi";
import { useLocalSearchParams, router } from "expo-router";

/* ---------------- TYPES ---------------- */
type FileType = {
  uri: string;
  name: string;
  type: string;
};

/* ---------------- ROW COMPONENT ---------------- */
const UploadRow = ({
  label,
  value,
  onPress,
  isOptional = false,
  showChoose = false,
}: {
  label: string;
  value?: FileType;
  onPress: () => void;
  isOptional?: boolean;
  showChoose?: boolean;
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.rowLeft}>
      <Ionicons name="person-outline" size={20} color="#1E3C72" />
      <Text style={styles.rowText}>
        {label}{" "}
        {isOptional && <Text style={{ color: "#90a4ae" }}>(Optional)</Text>}
      </Text>
    </View>

    {showChoose ? (
      <View style={styles.chooseBtn}>
        <Text style={styles.chooseText}>
          {value ? "Selected" : "Choose File"}
        </Text>
      </View>
    ) : (
      <View style={styles.plusBtn}>
        <Ionicons name={value ? "checkmark" : "add"} size={20} color="#fff" />
      </View>
    )}
  </TouchableOpacity>
);

export default function UploadDocuments() {
  const params = useLocalSearchParams();
  const employeeId =
    typeof params.employeeId === "string"
      ? params.employeeId
      : Array.isArray(params.employeeId)
        ? params.employeeId[0]
        : "";

  const [token, setToken] = useState<string | null>(null);

  const [files, setFiles] = useState<{
    pan?: FileType;
    bankPassbook?: FileType;
    aadharCard?: FileType;
    marksheet12?: FileType;
    graduationCertificate?: FileType;
  }>({});

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem("employeeToken");
      if (!storedToken) {
        Alert.alert("Session expired", "Please login again");
        router.replace("/employee");
        return;
      }
      if (!employeeId) {
        Alert.alert("Error", "Employee ID missing");
        router.back();
        return;
      }
      setToken(storedToken);
    })();
  }, []);

  /* ---------------- PICK DOCUMENT ---------------- */
  const pickDocument = async (field: keyof typeof files) => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
    });

    if (!res.canceled) {
      const f = res.assets[0];
      setFiles((prev) => ({
        ...prev,
        [field]: {
          uri: f.uri,
          name: f.name,
          type: f.mimeType || "application/octet-stream",
        },
      }));
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleUpload = async () => {
    try {
      if (!token) return;

      if (Object.keys(files).length === 0) {
        Alert.alert("No files selected");
        return;
      }

      await uploadEmployeeDocumentsApi(employeeId, token, files);
      Alert.alert("Success", "Documents uploaded");
      router.back();
    } catch (err: any) {
      Alert.alert("Upload failed", err.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* HEADER */}
      <LinearGradient colors={["#1E3C72", "#2A5298"]} style={styles.header}>
        <View style={styles.navbar}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BackButton />
            <Text style={styles.navTitle}>Upload Document</Text>
          </View>
        </View>
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.whiteCard}>
          <UploadRow
            label="PAN Card"
            value={files.pan}
            onPress={() => pickDocument("pan")}
          />

          <UploadRow
            label="Bank Passbook"
            value={files.bankPassbook}
            onPress={() => pickDocument("bankPassbook")}
          />

          <UploadRow
            label="Aadhar Card"
            value={files.aadharCard}
            onPress={() => pickDocument("aadharCard")}
          />

          <Text style={styles.optionalTitle}>Other Documents (Optional)</Text>

          <UploadRow
            label="12th Certificate"
            value={files.marksheet12}
            onPress={() => pickDocument("marksheet12")}
            isOptional
          />

          <UploadRow
            label="Graduation Certificate"
            value={files.graduationCertificate}
            onPress={() => pickDocument("graduationCertificate")}
            isOptional
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleUpload}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6FA" },

  header: {
    paddingTop: 55, // ⬅ reduced
    paddingBottom: 50, // ⬅ reduced
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
  },
  navTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10, // ⬅ reduced
  },

  whiteCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 15, // ⬅ was too large before
    borderRadius: 20,
    padding: 18,
    elevation: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFF",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 14,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rowText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E3C72",
  },

  plusBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1E3C72",
    justifyContent: "center",
    alignItems: "center",
  },

  chooseBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#E3ECFF",
    borderRadius: 10,
  },

  chooseText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E3C72",
  },

  optionalTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#90a4ae",
    marginVertical: 10,
  },

  submitBtn: {
    backgroundColor: "#1E3C72",
    height: 54,
    marginHorizontal: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
