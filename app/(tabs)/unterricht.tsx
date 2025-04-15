import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
/* API Ferienzeit */
import { fetchFerien, Ferienzeit } from "../utils/ferien";
/* import KompaktKalendar from "@/components/KompaktKalendar"; */

export default function UnterrichtScreen() {
  /* API Ferienzeit Berlin */
  const [ferienDaten, setFerienDaten] = useState<Ferienzeit[]>([]);
  useEffect(() => {
    fetchFerien("BE").then((ferien) => {
      setFerienDaten(ferien);
    });
  }, []);

  const groupList = [
    { group: "Sport 7a", color: "#f4a742" },
    { group: "Sport 8c", color: "#479e94" },
    { group: "Mathe 8c", color: "#9b59b6" },
    { group: "Sport 10d", color: "#e91e63" },
    { group: "Sport 8b", color: "#4f83cc" },
  ];

  const lessonPlan = [
    { thema: "", date: "" },
    { thema: "", date: "" },
    { thema: "", date: "" },
    { thema: "FERIEN", date: "" },
  ];
  const lessonPlansByGroup: Record<string, { thema: string }[]> = {
    "Sport 8c": [
      { thema: "Kondition" },
      { thema: "Koordination" },
      { thema: "" },
      { thema: "" },
      { thema: "" },
    ],
    "Sport 7a": [{ thema: "Thema 1" }, { thema: "" }, { thema: "" }],
    "Mathe 8c": [{ thema: "Geometrie" }, { thema: "Funktionen" }],
    "Sport 10d": [
      { thema: "Aufwärmen" },
      { thema: "Teamwork" },
      { thema: "Reflexion" },
    ],
    "Sport 8b": [{ thema: "" }, { thema: "" }],
  };
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  return (
    <ScrollView style={styles.container}>
      {/* Unterrichtsvorbereitung */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Unterrichtsvorbereitung</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plus}>＋</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subText}>14 Tage</Text>

        {groupList.map((item, idx) => {
          const lessons = lessonPlansByGroup[item.group] || [];
          const total = lessons.length;
          const prepared = lessons.filter(
            (l) => l.thema && l.thema !== ""
          ).length;
          const percent = total > 0 ? prepared / total : 0;

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedGroup(item.group)}
              style={styles.prepRow}
            >
              <View
                style={[styles.groupBadge, { backgroundColor: item.color }]}
              >
                <Text style={styles.badgeText}>{item.group}</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressDone, { flex: percent }]} />
                <View
                  style={[styles.progressRemaining, { flex: 1 - percent }]}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedGroup && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Unterricht der Klasse {selectedGroup}
            </Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            {lessonPlansByGroup[selectedGroup]?.length ?? 0} Stunden geplant
          </Text>

          {lessonPlansByGroup[selectedGroup]?.map((lesson, idx) => (
            <View key={idx} style={styles.lessonItem}>
              <Text style={styles.lessonNumber}>{idx + 1}.</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Thema:</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={lesson.thema}
                  editable={true}
                />
                <Text style={styles.label}>Datum:</Text>
                <TextInput style={styles.input} placeholder="Datum" />
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
  subText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  plusButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  prepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  groupBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 80,
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  progressBar: {
    flex: 1,
    height: 10,
    flexDirection: "row",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressDone: {
    backgroundColor: "green",
  },
  progressRemaining: {
    backgroundColor: "red",
  },
  lessonItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  lessonNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#aaa",
    width: 30,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  ferienBadge: {
    width: 30,
    height: 30,
    backgroundColor: "#b2d8b2",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  ferienBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
