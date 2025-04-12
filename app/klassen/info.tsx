import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Linking } from "react-native";

const studentInfo = [
  {
    vorname: "Julian",
    nachname: "Müller",
    geschlecht: "m",
    geburtsdatum: "12.01.2010",
    mutter: "Sabine Müller",
    mutterHandy: "0151 23456789",
    mutterMail: "sabine.mueller@example.com",
    vater: "Thomas Müller",
    vaterHandy: "0176 98765432",
    vaterMail: "thomas.mueller@example.com",
    adresse: "Beispielstraße 1, 12345 Musterstadt",
    geburtsort: "Berlin",
    geburtsland: "Deutschland",
  },
  {
    vorname: "Luise",
    nachname: "Schmidt",
    geschlecht: "w",
    geburtsdatum: "03.03.2011",
    mutter: "Anja Schmidt",
    mutterHandy: "0170 1112233",
    mutterMail: "anja.schmidt@example.com",
    vater: "Kai Schmidt",
    vaterHandy: "0171 2223344",
    vaterMail: "kai.schmidt@example.com",
    adresse: "Ringweg 5, 54321 Beispielstadt",
    geburtsort: "Hamburg",
    geburtsland: "Deutschland",
  },
  // Weitere Einträge ...
];

export default function InfoScreen() {
  /* Delete und Edit- Funktion */
  const [students, setStudents] = useState(studentInfo);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (index: number) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  const handleEdit = (index: number) => {
    const selected = students[index];
    setEditData({
      vorname: selected.vorname || "",
      nachname: selected.nachname || "",
      geschlecht: selected.geschlecht || "",
      geburtsdatum: selected.geburtsdatum || "",
      mutter: selected.mutter || "",
      mutterHandy: selected.mutterHandy || "",
      mutterMail: selected.mutterMail || "",
      vater: selected.vater || "",
      vaterHandy: selected.vaterHandy || "",
      vaterMail: selected.vaterMail || "",
      adresse: selected.adresse || "",
      geburtsort: selected.geburtsort || "",
      geburtsland: selected.geburtsland || "",
      // optional: weitere Felder wie adresse, mutter, vater etc.
    });
    setEditIndex(index);
    setModalVisible(true);
  };

  const saveEdit = () => {
    const updated = [...students];
    if (editIndex !== null) updated[editIndex] = editData;
    setStudents(updated);
    setModalVisible(false);
    setEditIndex(null);
  };

  return (
    <ScrollView horizontal>
      <View>
        <Text style={styles.heading}>Übersicht – Schülerdaten</Text>

        <ScrollView style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            {[
              "Vorname",
              "Nachname",
              "Geschlecht",
              "Geburtsdatum",
              "Mutter",
              "Handy (M)",
              "E-Mail (M)",
              "Vater",
              "Handy (V)",
              "E-Mail (M)",
              "Adresse",
              "Geburtsort",
              "Geburtsland",
            ].map((col, index) => (
              <Text key={index} style={styles.headerCell}>
                {col}
              </Text>
            ))}
          </View>

          {studentInfo.map((student, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{student.vorname}</Text>
              <Text style={styles.cell}>{student.nachname}</Text>
              <Text style={styles.cell}>{student.geschlecht}</Text>
              <Text style={styles.cell}>{student.geburtsdatum}</Text>
              <Text style={styles.cell}>{student.mutter}</Text>

              {/* Telefonnummer Mutter */}
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${student.mutterHandy}`)}
              >
                <Text style={[styles.cell, styles.phone]}>
                  {student.mutterHandy}
                </Text>
              </TouchableOpacity>

              {/* E-Mail Mutter */}
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${student.mutterMail}`)}
              >
                <Text style={[styles.cell, styles.mail]}>
                  {student.mutterMail}
                </Text>
              </TouchableOpacity>

              <Text style={styles.cell}>{student.vater}</Text>

              {/* Telefonnummer Vater */}
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${student.vaterHandy}`)}
              >
                <Text style={[styles.cell, styles.phone]}>
                  {student.vaterHandy}
                </Text>
              </TouchableOpacity>

              {/* E-Mail Vater */}
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${student.vaterMail}`)}
              >
                <Text style={[styles.cell, styles.mail]}>
                  {student.vaterMail}
                </Text>
              </TouchableOpacity>
              <Text style={styles.cell}>{student.adresse}</Text>
              <Text style={styles.cell}>{student.geburtsort}</Text>
              <Text style={styles.cell}>{student.geburtsland}</Text>

              {/* Edit / Delete Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => handleEdit(index)}
                  style={styles.editButton}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        {modalVisible && editData && (
          <Modal visible={modalVisible} animationType="slide">
            <ScrollView style={{ padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Schüler bearbeiten
              </Text>

              <Text>Vorname:</Text>
              <TextInput
                value={editData.vorname ?? ""}
                onChangeText={(text) =>
                  setEditData({ ...editData, vorname: text })
                }
                style={styles.input}
              />

              <Text>Nachname:</Text>
              <TextInput
                value={editData.nachname}
                onChangeText={(text) =>
                  setEditData({ ...editData, nachname: text })
                }
                style={styles.input}
              />

              {/* weitere Felder kannst du analog ergänzen */}

              <View style={{ flexDirection: "row", marginTop: 20, gap: 12 }}>
                <TouchableOpacity onPress={saveEdit} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Speichern</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setEditIndex(null);
                  }}
                  style={styles.cancelButton}
                >
                  <Text style={styles.buttonText}>Abbrechen</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tableContainer: {
    maxHeight: 500,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 6,
  },
  headerCell: {
    fontWeight: "bold",
    paddingHorizontal: 8,
    width: 120,
    fontSize: 12,
  },
  cell: {
    paddingHorizontal: 8,
    width: 120,
    fontSize: 12,
    color: "#eeeee4",
  },
  phone: {
    color: "#007AFF", // iOS-like Linkfarbe
    textDecorationLine: "underline",
  },
  mail: {
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: "#f1c40f",
    padding: 4,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
});
