// Stable UTC formatting across server and browser; stored timestamps are ISO UTC.
function formatDateHour(iso?: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16).replace("T", " ");
}
export default formatDateHour;
