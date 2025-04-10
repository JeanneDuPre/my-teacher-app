import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";

const KalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [entries, setEntries] = useState<
    { date: string; title: string; group: string }[]
  >([]);

  const handleAdd = () => {
    if (selectedDate && title && group) {
      setEntries((prev) => [...prev, { date: selectedDate, title, group }]);
      setTitle("");
      setGroup("");
      setModalVisible(false);
    }
  };

  const markedDates = entries.reduce((acc, entry) => {
    acc[entry.date] = { marked: true, dotColor: "blue" };
    return acc;
  }, {} as Record<string, any>);

  const filteredEntries = entries.filter((e) => e.date === selectedDate);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: { dateString: string }) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
        markedDates={markedDates}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.heading}>Eintrag für {selectedDate}</Text>

          <TextInput
            placeholder="Titel (z. B. Mathearbeit)"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Lerngruppe (z. B. 10b, Mathe GK)"
            value={group}
            onChangeText={setGroup}
            style={styles.input}
          />

          <Button title="Speichern" onPress={handleAdd} />
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "red" }}>Abbrechen</Text>
          </Pressable>

          <Text style={styles.heading}>Einträge:</Text>
          <FlatList
            data={filteredEntries}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.entry}>
                📌 {item.title} ({item.group})
              </Text>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default KalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  modalContent: { flex: 1, padding: 20 },
  heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
  },
  entry: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
    borderRadius: 6,
  },
});
