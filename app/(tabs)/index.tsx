import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

// mock data -> TODO dynamisch machen
const classes = [
  { name: "Sport 8c", color: "#479e94" },
  { name: "Sport 10d", color: "#d15b5b" },
  { name: "Sport 8b", color: "#4f83cc" },
  { name: "Mathe 8c", color: "#9b59b6" },
  { name: "Mathe 10d", color: "#e91e63" },
];

const todoItems = [
  { title: "Bewertung Annette abschließen", done: false },
  { title: "Anwesenheit 10d abschließen", done: true },
  { title: "Sportzeugkontrolle abschließen", done: false },
];

/* Klassenlehrer Optionen */
const teacherTools: ToolKey[] = [
  "Anwesenheit",
  "Bemerkungen",
  "Info",
  "Noten",
  "Schuelerakte",
  "Ziel",
  "Zeugnis",
];

type ValidRoutes =
  | "/klassen/info"
  | "/klassen/anwesenheit"
  | "/klassen/bemerkungen"
  | "/klassen/zeugnis"
  | "/klassen/schuelerakte"
  | "/klassen/ziel"
  | "/klassen/noten";

type ToolKey =
  | "Info"
  | "Anwesenheit"
  | "Bemerkungen"
  | "Zeugnis"
  | "Schuelerakte"
  | "Ziel"
  | "Noten";

const routeMap: Record<ToolKey, ValidRoutes> = {
  Info: "/klassen/info",
  Anwesenheit: "/klassen/anwesenheit",
  Bemerkungen: "/klassen/bemerkungen",
  Zeugnis: "/klassen/zeugnis",
  Schuelerakte: "/klassen/schuelerakte",
  Ziel: "/klassen/ziel",
  Noten: "/klassen/noten",
};

const events = [
  {
    date: "23.12.–01.01",
    title: "Weihnachtsferien",
    time: null,
    color: "#b3dcb2",
  },
  {
    date: "02.01.25",
    title: "Schulstart",
    time: null,
  },
  {
    date: "07.01.25",
    title: "Gesamtkonferenz",
    time: "15:30–16:30",
  },
];

// mock data: Stundenplan
const days = [
  { label: "Mo.", date: "06.01.", key: "mo" },
  { label: "Di.", date: "07.01.", key: "di" },
  { label: "Mi.", date: "08.01.", key: "mi" },
  { label: "Do.", date: "09.01.", key: "do" },
  { label: "Fr.", date: "10.01.", key: "fr" },
];

// Stundenplan-Matrix: [Stunde][Tag]
const plan = [
  ["Sport 8c", "", "Sport 10d", "Sport 8c", "Sport 8b"], // 1. Std.
  ["", "", "Mathe 10d", "Mathe 8c", ""], // 2. Std.
  ["Café", "", "Mathe 10d", "", "Sport 10d"], // 3. Std.
  ["Sport 10d", "Sport 8c", "", "", "Sport 8b"], // 4. Std.
  ["", "", "", "", "Café"], // 5. Std.
  ["Sport 8b", "", "", "", ""], // 6. Std.
  ["Sport 10d", "", "", "", ""], // 7. Std.
];

const colorMap: Record<string, string> = {
  "Sport 8c": "#479e94",
  "Sport 8b": "#4f83cc",
  "Sport 10d": "#d15b5b",
  "Mathe 8c": "#9b59b6",
  "Mathe 10d": "#e91e63",
  Café: "#000000",
};

export default function AllesScreen() {
  // weiterleiten zu einer anderen Seite
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Klassen */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Klassen</Text>
          <TouchableOpacity>
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.badgeRow}>
          {classes.map((c) => (
            <View
              key={c.name}
              style={[styles.classBadge, { backgroundColor: c.color }]}
            >
              <Text style={styles.classBadgeText}>{c.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stundenplan */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mein Stundenplan</Text>
          <View style={styles.exportRow}>
            <Text style={styles.export}>Excel</Text>
            <Text style={styles.export}>Pdf</Text>
            <Text style={styles.export}>Foto</Text>
          </View>
        </View>

        {/* 👉 hier ersetzt du den Inhalt */}
        <View style={styles.schedule}>
          <View style={styles.scheduleGrid}>
            {/* Kopfzeile */}
            <View style={styles.row}>
              <View style={styles.timeCell} />
              {days.map((day) => (
                <View key={day.key} style={styles.dayCell}>
                  <Text style={styles.dayText}>{day.label}</Text>
                  <Text style={styles.dateText}>{day.date}</Text>
                </View>
              ))}
            </View>

            {/* Stunden-Zeilen */}
            {plan.map((row, idx) => (
              <View key={idx} style={styles.row}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>{idx + 1}. Std.</Text>
                </View>
                {row.map((entry, colIdx) => (
                  <TouchableOpacity
                    key={colIdx}
                    onPress={() =>
                      router.push({
                        pathname: "/screens/lesson",
                        params: {
                          date: days[colIdx]?.date || "",
                          time: `${idx + 1}. Std.`,
                          className: entry,
                        },
                      })
                    }
                    style={[
                      styles.entryCell,
                      { backgroundColor: colorMap[entry] || "#e0e0e0" },
                    ]}
                  >
                    {entry !== "" && (
                      <Text
                        style={[
                          styles.entryText,
                          { color: entry === "Café" ? "#fff" : "#000" },
                        ]}
                      >
                        {entry}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ToDo */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ToDo</Text>
          <TouchableOpacity>
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </View>
        {todoItems.map((item, idx) => (
          <View key={idx} style={styles.todoItem}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: item.done ? "#ccc" : "#4CAF50" },
              ]}
            />
            <Text
              style={{
                textDecorationLine: item.done ? "line-through" : "none",
              }}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </View>

      {/* Klassenlehrer-Tools */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Klassenlehrer der Klasse 10d</Text>
        <View style={styles.toolGrid}>
          {teacherTools.map((tool) => (
            <TouchableOpacity
              key={tool}
              onPress={() =>
                router.push({
                  pathname: routeMap[tool],
                  params: { group: "10d" },
                })
              }
              style={styles.toolButton}
            >
              <Text style={styles.toolText}>{tool}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Events */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Events (14 Tage)</Text>
        </View>
        <FlatList
          data={events}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.eventRow,
                { backgroundColor: item.color || "#f0f0f0" },
              ]}
            >
              <View>
                <Text style={styles.eventDate}>{item.date}</Text>
                <Text style={styles.eventTitle}>{item.title}</Text>
              </View>
              {item.time && <Text style={styles.eventTime}>{item.time}</Text>}
            </View>
          )}
        />
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  plus: {
    fontSize: 20,
    color: "#555",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  classBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  classBadgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  exportRow: {
    flexDirection: "row",
    gap: 10,
  },
  export: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
  },
  schedule: {
    padding: 12,
    backgroundColor: "#fafafa",
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  toolGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  toolButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  toolText: {
    fontWeight: "bold",
    color: "#333",
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 12,
    color: "#555",
  },
  eventTitle: {
    fontWeight: "bold",
  },
  eventTime: {
    fontSize: 12,
    color: "#333",
    alignSelf: "center",
  },
  // Style Stundenplan
  scheduleGrid: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
  },
  timeCell: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  dayCell: {
    flex: 1,
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  dayText: {
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  entryCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  entryText: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
