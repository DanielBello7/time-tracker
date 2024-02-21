export default function readJsonFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
      const content = event.target?.result as string;
      const jsonDoc = JSON.parse(content);
      resolve(jsonDoc);
    }
    reader.onerror = function (error) {
      reject(error);
    }
  });
}

