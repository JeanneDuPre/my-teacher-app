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
import React, { useEffect, useState } from "react";
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
import { fetchFerien, Ferienzeit } from "../utils/ferien"; // oder relativer Pfad ../utils/ferien

export default function KalendarScreen() {
  /* Modal Kategorien */
  const [category, setCategory] = useState<
    "Studientag" | "Brückentag" | "Prüfungstag"
  >("Studientag");

  /* Ferienzeiten laden */
  function generateFerienMarkedDates(
    ferien: Ferienzeit[]
  ): Record<string, any> {
    const marked: Record<string, any> = {};

    ferien.forEach(({ start, end }) => {
      const startDate = new Date(start);
      const endDate = new Date(end);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const iso = d.toISOString().split("T")[0];
        marked[iso] = {
          disabled: true,
          marked: true,
          dotColor: "red",
          disableTouchEvent: true,
        };
      }
    });

    return marked;
  }

  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  useEffect(() => {
    fetchFerien("BE").then((ferien) => {
      const ferienMarked = generateFerienMarkedDates(ferien);
      setMarkedDates(ferienMarked);
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  type EventEntry = {
    date: string;
    title: string;
    group: string;
    category: "Studientag" | "Brückentag" | "Prüfungstag";
    color: string;
  };

  const [entries, setEntries] = useState<EventEntry[]>([]);

  const handleAdd = () => {
    if (selectedDate && title && group) {
      const colorMap: Record<string, string> = {
        Studientag: "yellow",
        Brückentag: "orange",
        Prüfungstag: "purple",
      };

      const newEntry = {
        date: selectedDate,
        title,
        group,
        category,
        color: colorMap[category],
      };

      setEntries((prev) => [...prev, newEntry]);
      setTitle("");
      setGroup("");
      setCategory("Studientag");
      setModalVisible(false);
    }
  };

  const filteredEntries = entries.filter((e) => e.date === selectedDate);
  const [events, setEvents] = useState<
    {
      date: string;
      title: string;
      range?: string;
      time?: string;
      color?: string;
    }[]
  >([]);

  useEffect(() => {
    fetchFerien("BE").then((ferien) => {
      const ferienMarked = generateFerienMarkedDates(ferien);
      setMarkedDates(ferienMarked);

      // 🟩 Konvertiere Ferien zu Events
      const ferienEvents = ferien
        .map((f) => ({
          date: f.start,
          title: f.name,
          range: `${formatDate(f.start)}–${formatDate(f.end)}`,
          color: "red",
        }))
        .filter((e) => {
          const today = new Date();
          const in14 = new Date();
          in14.setDate(today.getDate() + 21); /* 14 Tage oder 21 Tage */
          return new Date(e.date) >= today && new Date(e.date) <= in14;
        });

      setEvents(ferienEvents);
    });
  }, []);

  function formatDate(dateString: string) {
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  }

  /*   // Markierungen für den Kalender
  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: "#4CAF50",
      selected: true,
      selectedColor: event.color || "#d0f0c0",
    };
    return acc;
  }, {} as any); */

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
          todayTextColor: "green",
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            {["Studientag", "Brückentag", "Prüfungstag"].map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat as any)}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: category === cat ? "#000" : "#ccc",
                  backgroundColor: category === cat ? "#000" : "#fff",
                }}
              >
                <Text style={{ color: category === cat ? "#fff" : "#000" }}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button title="Speichern" onPress={handleAdd} />
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "red" }}>Abbrechen</Text>
          </Pressable>

          <Text style={styles.heading}>Einträge:</Text>
          <FlatList
            data={entries}
            keyExtractor={(item, index) => item.date + item.title + index}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.eventRow,
                  { backgroundColor: item.color || "#f0f0f0" },
                ]}
              >
                <View style={styles.eventLeft}>
                  <Text style={[styles.eventDate, { color: "white" }]}>
                    {item.date}
                  </Text>
                  <Text style={[styles.eventTitle, { color: "white" }]}>
                    {item.title} ({item.group})
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </Modal>

      {/* Legende */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "red" }]} />
          <Text>Ferien</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "yellow" }]} />
          <Text>Studientag</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "purple" }]} />
          <Text>Prüfungstag (MSA, BBR)</Text>
        </View>
      </View>

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
              {
                backgroundColor: item.color || "#f0f0f0",
              },
            ]}
          >
            <View style={styles.eventLeft}>
              <Text style={[styles.eventDate, { color: "white" }]}>
                {item.range || item.date}
              </Text>
              <Text style={[styles.eventTitle, { color: "white" }]}>
                {item.title}
              </Text>
            </View>
            {item.time && (
              <Text style={[styles.eventTime, { color: "white" }]}>
                {item.time}
              </Text>
            )}
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

  /* Legende */
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
