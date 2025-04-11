// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Modal,
//   Pressable,
//   FlatList,
// } from "react-native";
// import { Calendar } from "react-native-calendars";

// const KalendarScreen = () => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [title, setTitle] = useState("");
//   const [group, setGroup] = useState("");
//   const [entries, setEntries] = useState<
//     { date: string; title: string; group: string }[]
//   >([]);

//   const handleAdd = () => {
//     if (selectedDate && title && group) {
//       setEntries((prev) => [...prev, { date: selectedDate, title, group }]);
//       setTitle("");
//       setGroup("");
//       setModalVisible(false);
//     }
//   };

//   const markedDates = entries.reduce((acc, entry) => {
//     acc[entry.date] = { marked: true, dotColor: "blue" };
//     return acc;
//   }, {} as Record<string, any>);

//   const filteredEntries = entries.filter((e) => e.date === selectedDate);

//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={(day: { dateString: string }) => {
//           setSelectedDate(day.dateString);
//           setModalVisible(true);
//         }}
//         markedDates={markedDates}
//       />

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContent}>
//           <Text style={styles.heading}>Eintrag für {selectedDate}</Text>

//           <TextInput
//             placeholder="Titel (z. B. Mathearbeit)"
//             value={title}
//             onChangeText={setTitle}
//             style={styles.input}
//           />

//           <TextInput
//             placeholder="Lerngruppe (z. B. 10b, Mathe GK)"
//             value={group}
//             onChangeText={setGroup}
//             style={styles.input}
//           />

//           <Button title="Speichern" onPress={handleAdd} />
//           <Pressable
//             onPress={() => setModalVisible(false)}
//             style={{ marginTop: 20 }}
//           >
//             <Text style={{ color: "red" }}>Abbrechen</Text>
//           </Pressable>

//           <Text style={styles.heading}>Einträge:</Text>
//           <FlatList
//             data={filteredEntries}
//             keyExtractor={(_, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.entry}>
//                 📌 {item.title} ({item.group})
//               </Text>
//             )}
//           />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default KalendarScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 20 },
//   modalContent: { flex: 1, padding: 20 },
//   heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 10,
//     marginVertical: 10,
//   },
//   entry: {
//     padding: 8,
//     backgroundColor: "#f0f0f0",
//     marginVertical: 4,
//     borderRadius: 6,
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function KalendarScreen() {
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

  const filteredEntries = entries.filter((e) => e.date === selectedDate);
  const events = [
    {
      date: "2024-12-23",
      title: "Weihnachtsferien",
      range: "23.12.–01.01",
      color: "#b3dcb2",
    },
    {
      date: "2025-01-02",
      title: "Schulstart",
      color: "#f0f0f0",
    },
    {
      date: "2025-01-07",
      title: "Gesamtkonferenz",
      time: "15:30–16:30",
      color: "#f0f0f0",
    },
  ];

  // Markierungen für den Kalender
  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: "#4CAF50",
      selected: true,
      selectedColor: event.color || "#d0f0c0",
    };
    return acc;
  }, {} as any);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mein Kalendar</Text>
        <TouchableOpacity>
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Kalender */}

      <Calendar
        onDayPress={(day: { dateString: string }) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
          arrowColor: "#000",
          todayTextColor: "#4CAF50",
          selectedDayBackgroundColor: "#4CAF50",
        }}
      />

      {/* Modal- Event eingeben */}
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

      {/* Events */}
      <View style={styles.eventsHeader}>
        <Text style={styles.eventsTitle}>anstehende Events</Text>
        <TouchableOpacity>
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.date + item.title}
        renderItem={({ item }) => (
          <View
            style={[
              styles.eventRow,
              { backgroundColor: item.color || "#f0f0f0" },
            ]}
          >
            <View style={styles.eventLeft}>
              <Text style={styles.eventDate}>{item.range || item.date}</Text>
              <Text style={styles.eventTitle}>{item.title}</Text>
            </View>
            {item.time && <Text style={styles.eventTime}>{item.time}</Text>}
          </View>
        )}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   modalContent: { flex: 1, padding: 20 },
//   heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 6,
//     padding: 10,
//     marginVertical: 10,
//   },
//   entry: {
//     padding: 8,
//     backgroundColor: "#f0f0f0",
//     marginVertical: 4,
//     borderRadius: 6,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plus: {
    fontSize: 24,
    color: "#555",
  },
  calendar: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventLeft: {
    flex: 1,
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
  modalContent: { flex: 1, padding: 20 },
  heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
});
