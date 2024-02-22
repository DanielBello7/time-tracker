export default function getDate(val?: string | Date): string {
  if (val) {
    return new Date(val).toLocaleDateString("en-us", {
      dateStyle: "full"
    });
  }
  return new Date().toLocaleDateString("en-us", {
    dateStyle: "full"
  });
}
