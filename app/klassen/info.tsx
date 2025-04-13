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
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const handleDeleteRequest = (index: number) => {
    setDeleteIndex(index);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = [...students];
      updated.splice(deleteIndex, 1);
      setStudents(updated);
    }
    setDeleteConfirmVisible(false);
    setDeleteIndex(null);
  };

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
                  onPress={() => handleDeleteRequest(index)}
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
              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 50 }}>
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
              <Text>Geschlecht:</Text>
              <TextInput
                value={editData.geschlecht}
                onChangeText={(text) =>
                  setEditData({ ...editData, geschlecht: text })
                }
                style={styles.input}
              />
              <Text>Geburtsdatum:</Text>
              <TextInput
                value={editData.geburtsdatum}
                onChangeText={(text) =>
                  setEditData({ ...editData, geburtsdatum: text })
                }
                style={styles.input}
              />
              <Text>Mutter:</Text>
              <TextInput
                value={editData.mutter}
                onChangeText={(text) =>
                  setEditData({ ...editData, mutter: text })
                }
                style={styles.input}
              />
              <Text>Handy (M):</Text>
              <TextInput
                value={editData.mutterHandy}
                onChangeText={(text) =>
                  setEditData({ ...editData, mutterHandy: text })
                }
                style={styles.input}
              />
              <Text>E-Mail (M):</Text>
              <TextInput
                value={editData.mutterMail}
                onChangeText={(text) =>
                  setEditData({ ...editData, mutterMail: text })
                }
                style={styles.input}
              />
              <Text>Vater:</Text>
              <TextInput
                value={editData.vater}
                onChangeText={(text) =>
                  setEditData({ ...editData, vater: text })
                }
                style={styles.input}
              />
              <Text>Handy (V)</Text>
              <TextInput
                value={editData.vaterHandy}
                onChangeText={(text) =>
                  setEditData({ ...editData, vaterHandy: text })
                }
                style={styles.input}
              />
              <Text>Email (V):</Text>
              <TextInput
                value={editData.vaterMail}
                onChangeText={(text) =>
                  setEditData({ ...editData, vaterMail: text })
                }
                style={styles.input}
              />
              <Text>Geburtsort:</Text>
              <TextInput
                value={editData.geburtsort}
                onChangeText={(text) =>
                  setEditData({ ...editData, geburtsort: text })
                }
                style={styles.input}
              />
              <Text>Geburtsland:</Text>
              <TextInput
                value={editData.geburtsland}
                onChangeText={(text) =>
                  setEditData({ ...editData, geburtsland: text })
                }
                style={styles.input}
              />

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
        <Modal visible={deleteConfirmVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.confirmBox}>
              <Text style={styles.modalTitle}>Schüler wirklich löschen?</Text>
              <Text style={styles.modalText}>
                Möchtest du{" "}
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  {students[deleteIndex ?? 0]?.vorname}{" "}
                  {students[deleteIndex ?? 0]?.nachname}
                </Text>{" "}
                wirklich löschen?
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setDeleteConfirmVisible(false);
                    setDeleteIndex(null);
                  }}
                >
                  <Text style={styles.buttonText}>Nein</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={confirmDelete}
                >
                  <Text style={styles.buttonText}>Ja</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    flex: 1,
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
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
    marginBottom: 100,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  confirmBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },
});
