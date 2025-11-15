function formatDateHour(iso?: string | null) {
  if (!iso) return "";
  console.log(iso);
  try {
    const d = new Date(iso);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hour = String(d.getHours()).padStart(2, "0");
    const minute = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}`;
  } catch {
    return iso;
  }
}

export default formatDateHour;
