export type Ferienzeit = {
  name: string;
  start: string; // Format: YYYY-MM-DD
  end: string;
};

export async function fetchFerien(bundesland = "BE"): Promise<Ferienzeit[]> {
  try {
    const res = await fetch(
      `https://ferien-api.de/api/v1/holidays/${bundesland}`
    );
    if (!res.ok) throw new Error("Fehler beim Abrufen der API");
    return await res.json();
  } catch (e) {
    console.error("Fehler beim Abrufen der Ferien:", e);
    return [];
  }
}
