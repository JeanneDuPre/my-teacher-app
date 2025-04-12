import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";

const studentInfo = [
  {
    vorname: "Julian",
    nachname: "Müller",
    geschlecht: "m",
    geburtsdatum: "12.01.2010",
    mutter: "Sabine Müller",
    mutterHandy: "0151 23456789",
    vater: "Thomas Müller",
    vaterHandy: "0176 98765432",
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
    vater: "Kai Schmidt",
    vaterHandy: "0171 2223344",
    adresse: "Ringweg 5, 54321 Beispielstadt",
    geburtsort: "Hamburg",
    geburtsland: "Deutschland",
  },
  // Weitere Einträge ...
];

export default function InfoScreen() {
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
              "Vater",
              "Handy (V)",
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
              <Text style={styles.cell}>{student.mutterHandy}</Text>
              <Text style={styles.cell}>{student.vater}</Text>
              <Text style={styles.cell}>{student.vaterHandy}</Text>
              <Text style={styles.cell}>{student.adresse}</Text>
              <Text style={styles.cell}>{student.geburtsort}</Text>
              <Text style={styles.cell}>{student.geburtsland}</Text>
            </View>
          ))}
        </ScrollView>
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
  },
});
