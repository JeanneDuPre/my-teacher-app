import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// weiterleiten zu einer anderen Seite
const router = useRouter();

export default function LessonScreen() {
  const { date, time, className } = useLocalSearchParams<{
    date?: string;
    time?: string;
    className?: string;
  }>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{ marginLeft: 8, fontSize: 16 }}>Zurück</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>
          Unterrichtsreihe {className} - {date} - {time}
        </Text>

        <View style={styles.topicRow}>
          <View style={styles.topicCard}>
            <Text style={styles.topicLabel}>Thema der letzten Stunde</Text>
            <Text style={styles.topicTitle}>Team Sports</Text>
          </View>
          <View style={styles.topicCardActive}>
            <Text style={styles.topicLabel}>Heutiges Thema</Text>
            <Text style={styles.topicTitle}>Fitness Activities</Text>
            <Text style={styles.topicNote}>3 Tage in Vorbereitung</Text>
          </View>
          <View style={styles.topicCard}>
            <Text style={styles.topicLabel}>Thema der nächsten Stunde</Text>
            <Text style={styles.topicTitle}>Outdoor Games</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Organisatorisches</Text>

        <View style={styles.item}>
          <Text>🟢 Anwesenheit heute</Text>
          <Text>15 Anwesend, 2 Abwesend</Text>
        </View>

        <View style={styles.item}>
          <Text>🟡 Abwesenheit im letzten Unterricht</Text>
          <Text style={{ color: "red" }}>Marie, Jakob, Annette</Text>
        </View>

        <View style={styles.item}>
          <Text>🟡 Abwesenheit insgesamt</Text>
          <Text>Marie (5 Std.), Annette (3), Jakob (6)</Text>
        </View>

        <View style={styles.item}>
          <Text>⏰ Verspätung</Text>
          <Text>Luise (10 Min.), Annette (2 Mal)</Text>
        </View>

        <View style={styles.item}>
          <Text>⛔ Sportbefreiung</Text>
          <Text>Jakob bis 12.01.2025, Luise bis 31.01.2025</Text>
        </View>

        <View style={styles.item}>
          <Text>📋 Sportzeugüberprüfung</Text>
          <Text style={{ color: "red" }}>Marie (❌), Micha (❌)</Text>
        </View>

        <View style={styles.item}>
          <Text>📊 Leistungsbewertung</Text>
          <Text>Test / KA</Text>
        </View>

        <Text style={styles.sectionTitle}>Zu bewertende Schüler</Text>

        {["Annette", "Maria", "Luise", "Anton", "Hanna"].map((name) => (
          <View key={name} style={styles.ratingRow}>
            <Text>{name}</Text>
            <Text>💬 ❤️ 🏃 📋</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  topicRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  topicCard: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
  topicCardActive: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#999",
  },
  topicLabel: { fontSize: 12, color: "#555" },
  topicTitle: { fontWeight: "bold", fontSize: 14 },
  topicNote: { fontSize: 12, color: "#666", marginTop: 6 },
  item: { marginBottom: 12 },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
