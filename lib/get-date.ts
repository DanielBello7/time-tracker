export default function getDate(val?: string | Date): string {
  return new Date(val ?? "").toLocaleDateString("en-us", {
    dateStyle: "full"
  });
}
