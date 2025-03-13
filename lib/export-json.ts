export default function exportJson(data: JSON, title: string): void {
  const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const newLink = document.createElement("a");
  const url = window.URL.createObjectURL(file)
  newLink.setAttribute("href", url);
  newLink.setAttribute("download", title);
  document.body.appendChild(newLink);
  newLink.click();
  document.body.removeChild(newLink);
  URL.revokeObjectURL(url);
}

