/* import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { fetchFerien, Ferienzeit } from "../utils/ferien";

type Props = {
  onSelect: (date: string) => void;
  selectedDate?: string;
};

export default function KompaktKalendar({ onSelect, selectedDate }: Props) {
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchFerien("BE").then((ferien) => {
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

      // Markiere optional das ausgewählte Datum
      if (selectedDate) {
        marked[selectedDate] = {
          ...(marked[selectedDate] || {}),
          selected: true,
          selectedColor: "#4CAF50",
        };
      }

      setMarkedDates(marked);
    });
  }, [selectedDate]);

  return (
    <Calendar
      onDayPress={(day) => onSelect(day.dateString)}
      markedDates={markedDates}
      style={{ borderRadius: 12 }}
      theme={{
        arrowColor: "#000",
        todayTextColor: "green",
        selectedDayBackgroundColor: "#4CAF50",
      }}
    />
  );
}
 */
