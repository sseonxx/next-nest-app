export function convertDotNetDate(dotNetDate: string) {
  const timestamp = parseInt(dotNetDate.match(/\d+/)?.[0] || '0', 10);
  if (!timestamp) return 'Invalid date';
  const date = new Date(timestamp);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function formatToYearMonth(dotNetDate: string): string {
  const dateStr = convertDotNetDate(dotNetDate);
  const cleanedDate = dateStr.replace(/\s/g, '');
  return cleanedDate.substring(0, 7);
}