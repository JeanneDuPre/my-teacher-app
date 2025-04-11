import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const groups = [
  { name: "Sport 8c", color: "#479e94" },
  { name: "Sport 10d", color: "#d15b5b" },
  { name: "Sport 7a", color: "#f7a440" },
  { name: "Sport 8b", color: "#4f83cc" },
  { name: "Mathe 8c", color: "#9b59b6" },
  { name: "Mathe 10d", color: "#e91e63" },
];

const todosToday = [
  { group: "Sport 7a", text: "Bewertung Annette abschließen" },
  { group: "Sport 10d", text: "Anwesenheit 10d abschließen" },
  { group: "Sport 8b", text: "Sportzeugkontrolle abschließen" },
];

const projects = [
  {
    group: "Sport 8c",
    title: "Ausflug: Skilaufen gehen",
    members: "SuS, Frau Behrends",
  },
  {
    group: "Sport 7a",
    title: "Klassenfahrt",
    members: "",
  },
];

export default function TodoScreen() {
  const getColor = (groupName: string) =>
    groups.find((g) => g.name === groupName)?.color || "#ccc";
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* ToDo's erstellen */}
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>ToDo’s erstellen</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.badgeRow}>
          {groups.map((g) => (
            <View
              key={g.name}
              style={[styles.groupBadge, { backgroundColor: g.color }]}
            >
              <Text style={styles.groupText}>{g.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ToDo's heute */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ToDo’s HEUTE</Text>
        <Text style={styles.date}>vom 28.12.24</Text>
        {todosToday.map((todo, index) => (
          <View key={index} style={styles.todoRow}>
            <View
              style={[
                styles.todoGroup,
                { backgroundColor: getColor(todo.group) },
              ]}
            >
              <Text style={styles.todoGroupText}>{todo.group}</Text>
            </View>
            <Text>{todo.text}</Text>
          </View>
        ))}
      </View>

      {/* Projektplanung */}
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Projektplanung (Trello)</Text>
          <TouchableOpacity>
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </View>

        {projects.map((p, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.projectRow}
            onPress={() =>
              router.push({
                pathname: "/screens/trello",
                params: {
                  group: p.group,
                  title: p.title,
                },
              })
            }
          >
            <View
              style={[
                styles.projectBadge,
                { backgroundColor: getColor(p.group) },
              ]}
            >
              <Text style={styles.projectGroupText}>{p.group}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.projectTitle}>{p.title}</Text>
              {p.members !== "" && (
                <Text style={styles.projectMembers}>{p.members}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24, // ggf. anpassen
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  plusButton: {
    width: 36,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  groupBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  groupText: {
    color: "#fff",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  todoGroup: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  todoGroupText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  projectRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  projectBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  projectGroupText: {
    color: "#fff",
    fontWeight: "bold",
  },
  projectTitle: {
    fontWeight: "bold",
  },
  projectMembers: {
    fontSize: 12,
    color: "#555",
  },
});
