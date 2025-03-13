/**
 * returns an array of boolean values, checks if the value of a key 
 * actually has a value
 * @param data object
 * @returns boolean[]
 */
export default function sanitize(data: Record<string, string>): boolean {
  const response = Object.keys(data).map((item) => {
    if (!data[item].trim()) return false;
    return true;
  });
  if (response.includes(false)) return false
  return true
}

