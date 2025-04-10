import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";

type Task = {
  title: string;
  info?: string;
  date?: string;
};

export default function TodoScreen() {
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.boardBadge}>
          <Text style={styles.boardText}>{boardName}</Text>
        </View>
        <Text style={styles.goal}>Ziel: {goal}</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "white" },
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
});
