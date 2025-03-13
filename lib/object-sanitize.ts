export default function objectSanitize(data: Record<string, any>): Record<string, any> {
  let newDocument = {}
  Object.keys(data).forEach((item) => {
    if (data[item] !== null && data[item] !== undefined) {
      newDocument = {
        ...newDocument,
        [item]: data[item]
      }
    }
  });
  return newDocument;
}

