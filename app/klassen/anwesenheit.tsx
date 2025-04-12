import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { studentData } from "../utils/studentData";

type Status = "present" | "absent";

type Student = {
  name: string;
  status: Status;
};

export default function AnwesenheitScreen() {
  const router = useRouter();
  const { group } = useLocalSearchParams<{ group?: string }>();
  const studentNames = group ? studentData[group] ?? [] : [];

  const [students, setStudents] = useState<Student[]>(
    studentNames.map((name) => ({
      name,
      status: "present",
    }))
  );

  const updateStatus = (index: number, status: Status) => {
    setStudents((prev) =>
      prev.map((s, i) => (i === index ? { ...s, status } : s))
    );
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backRow}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.heading}>
          Anwesenheit {group ? `der Klasse ${group}` : ""}
        </Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Heutige Anwesenheit</Text>
      <Text style={styles.date}>Mo., 2.–3. Stunde, 28.12.2024</Text>

      {/* Schülerliste */}
      {students.map((student, idx) => (
        <View key={idx} style={styles.row}>
          {/* Abwesend */}
          <TouchableOpacity
            onPress={() => updateStatus(idx, "absent")}
            style={[
              styles.statusButton,
              {
                backgroundColor:
                  student.status === "absent" ? "#f44336" : "#fdd",
                borderColor: "#f44336",
              },
            ]}
          >
            <Text style={styles.statusText}>Absent</Text>
          </TouchableOpacity>

          {/* Name + Uhr */}
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.clock}>⏰</Text>
          </View>

          {/* Present */}
          <TouchableOpacity
            onPress={() => updateStatus(idx, "present")}
            style={[
              styles.statusButton,
              {
                backgroundColor:
                  student.status === "present" ? "#4CAF50" : "#dfd",
                borderColor: "#4CAF50",
              },
            ]}
          >
            <Text style={styles.statusText}>Present</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  clock: {
    fontSize: 16,
    color: "#f1c40f",
  },
  statusButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  cancelText: {
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});
