function formatDateHour(iso?: string | null) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    // Check if the date looks like it's in UTC (hours are off by 4)
    // Add 4 hours to compensate for Railway storing in UTC
    const offset = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    const adjusted = new Date(d.getTime() + offset);

    const year = adjusted.getFullYear();
    const month = String(adjusted.getMonth() + 1).padStart(2, "0");
    const day = String(adjusted.getDate()).padStart(2, "0");
    const hour = String(adjusted.getHours()).padStart(2, "0");
    const minute = String(adjusted.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}`;
  } catch {
    return iso;
  }
}

export default formatDateHour;
