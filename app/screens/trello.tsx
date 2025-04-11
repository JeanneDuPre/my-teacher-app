import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from "react-native";

type Task = {
  title: string;
  info?: string;
  date?: string;
};

export default function TodoScreen() {
  // neue States hinzufügen
  const [modalVisible, setModalVisible] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newColumn, setNewColumn] = useState<"ToDo" | "In Progress" | "Done">(
    "ToDo"
  );

  const [selectedGroup, setSelectedGroup] = useState("Sport 8c");

  const groups = [
    { name: "Sport 8c", color: "#479e94" },
    { name: "Mathe 8d", color: "#d15b5b" },
    { name: "Mathe 10e", color: "#4f83cc" },
  ];

  const [boardName] = useState("Sport 8c");
  const [goal] = useState("Ausflug Skilaufen");

  const [columns, setColumns] = useState({
    "In Progress": [
      { title: "Online Infos", info: "SuS", date: "31.12.24" },
      { title: "Online Infos", info: "Lehrer", date: "31.12.24" },
    ],
    ToDo: [
      { title: "Diskussion im Klassenrat", date: "06.01.25" },
      { title: "Anfrage stellen und Anrufen", date: "07.01.25" },
    ],
    Done: [{ title: "Skilaufen", date: "13.01.25" }],
  });

  const renderCard = (task: Task, index: number) => (
    <View key={index} style={styles.card}>
      <Text style={styles.cardTitle}>{task.title}</Text>
      {task.info && <Text style={styles.cardInfo}>{task.info}</Text>}
      {task.date && <Text style={styles.cardDate}>{task.date}</Text>}
    </View>
  );

  const renderColumn = (key: keyof typeof columns) => (
    <View style={styles.column} key={key}>
      <View style={styles.columnHeader}>
        <Text style={styles.columnTitle}>{key}</Text>
        <TouchableOpacity>
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      </View>
      {columns[key].map(renderCard)}
    </View>
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* {Header} */}
        <View style={styles.header}>
          <View style={styles.groupRow}>
            {groups.map((group) => (
              <TouchableOpacity
                key={group.name}
                onPress={() => setSelectedGroup(group.name)}
                style={[
                  styles.groupBadge,
                  {
                    backgroundColor: group.color,
                    opacity: selectedGroup === group.name ? 1 : 0.5,
                  },
                ]}
              >
                <Text style={styles.groupBadgeText}>{group.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </View>

        {/* Ziel separat */}
        <Text style={styles.goal}>Ziel: {goal}</Text>

        {/* Columns */}
        <View style={styles.columnsContainer}>
          {Object.keys(columns).map((key) =>
            renderColumn(key as keyof typeof columns)
          )}
        </View>

        {/* Footer */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Neue Aufgabe</Text>

            <TextInput
              placeholder="Titel"
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Zusatzinfo (optional)"
              value={newInfo}
              onChangeText={setNewInfo}
              style={styles.input}
            />
            <TextInput
              placeholder="Datum (optional)"
              value={newDate}
              onChangeText={setNewDate}
              style={styles.input}
            />

            <View style={styles.columnPicker}>
              {["ToDo", "In Progress", "Done"].map((col) => (
                <TouchableOpacity
                  key={col}
                  onPress={() => setNewColumn(col as any)}
                  style={[
                    styles.columnButton,
                    newColumn === col && styles.columnButtonActive,
                  ]}
                >
                  <Text
                    style={
                      newColumn === col
                        ? styles.columnTextActive
                        : styles.columnText
                    }
                  >
                    {col}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Abbrechen"
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Hinzufügen"
                onPress={() => {
                  if (!newTitle.trim()) return;
                  setColumns((prev) => ({
                    ...prev,
                    [newColumn]: [
                      ...prev[newColumn],
                      { title: newTitle, info: newInfo, date: newDate },
                    ],
                  }));
                  // Reset
                  setNewTitle("");
                  setNewInfo("");
                  setNewDate("");
                  setNewColumn("ToDo");
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  groupRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
    marginTop: 8,
  },
  groupBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  groupBadgeText: {
    color: "white",
    fontWeight: "bold",
  },
  container: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  boardBadge: {
    backgroundColor: "#479e94",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  boardText: { color: "white", fontWeight: "bold" },
  goal: { fontSize: 16, flex: 1 },
  headerButton: {
    paddingHorizontal: 8,
  },
  plus: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  columnsContainer: {
    flexDirection: "column",
    gap: 12,
  },
  column: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  columnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  columnTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#e4f1ef",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardInfo: {
    color: "#333",
  },
  cardDate: {
    fontSize: 12,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  cancelButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    padding: 12,
    backgroundColor: "black",
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  cancelText: { textAlign: "center", color: "black", fontWeight: "bold" },
  saveText: { textAlign: "center", color: "white", fontWeight: "bold" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  columnPicker: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  columnButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  columnButtonActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  columnText: {
    color: "#333",
  },
  columnTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
