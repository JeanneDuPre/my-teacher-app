TODO

Screens:

1. Anbindung an Daten
2. - funktioniert nicht -> Modal (ToDo_Screen); Funktioniert im Kalendar
3. Layout ändern:
   a) Kalendar:
   i. Modalscreen nur als Fenster öffnen, nicht den gesamten Bildschirm
   ii. Modalscreen Button allgemeinen Layout anpassen
   iii.Kalendarhintergrund auch schwarz möglich, je nach Wahl des Handys
   Dynamisch: Events auslesen; heutige Tag markieren, die Events der nächsten 14 Tage anzeigen

   Layout alle:

   1. - umranden in Schwarz (gut gelungen bei Unterricht)
   2. Klassenlehrer-> Zeugnis löschen-> Einbau in Noten mit Export-Funktion
   3. weitere Sektion einführen: Fachlehrerinfo-> Telefonnummern der Schüler anzeigen; WAS NOCH?

   Trello-Screen: TODO

   1. Auswahl der Lerngruppen aktivieren
   2. jeweilige Ziele der Lerngruppe anzeigen
   3. Layout anpassen
   4. Items ancklickbar machen-> löschen oder zu erledigt hinzufügen -> erledigt als unterer Container hinzufügen

   Kalendar-Screen: TODO

   1. Modal anpassen:

      - Admin: Studientag eintragen (Schulleitung), Prüfungen (Mittelstufenkoordinator)
      - Lehrer-> Fragen, ob Event, ToDo, KA, LEK -> erste Auswahl festlegen

        - Event: Datum, Uhrzeit, Ort, Titel, Inhalt, Bild hochladen, Einladung von SL, KK (optional)
        - ToDo: Datum, Uhrzeit (optional), Ort (optional), Titel, Inhalt, Klasse (optional), weitere Lehrer (optional), Ziel (optional), Bild hochladen (optional)

        - KA: Datum, Uhrzeit, Raum, Klasse, Fach -> Anzeige, ob überhaupt möglich ist (grün, gelb oder rote Punkte für die Tage oder die Woche?)
        - LEK: Datum, Uhrzeit, Raum, Klasse, Fach
          -> Button "Cancel, Save Changes"

   2. Ferien für Berlin eintragen (automatisch) ERLEDIGT -> SPÄTER für ADMIN auslagern
   3. unter anstehende Events-> Blog anstehende KA in deinen Lerngruppen-> diese Woche, nächste Woche, übernächste Woche
   4. anklicken von anstehenden Events möglich, um sie zu bearbeiten oder zu löschen
   5. Push-Benachrichtigung, wenn man zu einem Event eingeladen wurde
   6. Anzeigetext der API-Wiedergabe an Rechtschreibung anpassen
   7. Kubernetes-> nur einmal im Jahr laden

4. Anwesenheit:

   - Daten aus einer JSON rauslesen-> Supabase als nächstes
   - Daten von lessn zu anwesenheit übergeben

5. Info-Seite

   - ID vor Schüler
   - Dynamisches Auslesen
   - Layout: Button anpassen für Modal Delete und Modal Edit-> Button-Layout insgesamt überdenken

6. Unterricht-Seite
   - Vorbereitung legt sich über Balken TODO
   - Plus von hier als style übernehmen

Was noch fehlt:

- Bemerkungen-Seite: Dashboard erstellen mit wichtigen Hinweisen

  - Insgesamt positive und negative Bemerkungen; Info
  - Schüler, in welchen Stunden
  - einzelne Bemerkungen in Schülerakte übertragen können
  - Layout: positive - Schüler - negative

- Schuelerakte strukturieren:

  - Dokumentation von Kontakt mit Eltern: Anruf, Grund, Datum, Notiz
  - Schulversäumnisanzeigen automatisch ausfüllen-> in Akte eintragen
  - Zeugnisse in Akte hineinlegen
  - SEL-Gespräche hinzufügen
  - wichtige Bemerkungen eintragen, in welchen Tab?

- KA -> Noten-> Übersicht für Mathe, Englisch, Deutsch generieren ()

- Noten eintragen für Test, KA, Mitarbeit
- Inhalt der Stunde eintragen
