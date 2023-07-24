const BASE_URL = 'http://localhost:3001';
export function getFilterableTableSettings(url: string) {
  return {
    dataKey: 'data',
    endPoint: `${BASE_URL}/${url}`,
    totalKey: 'meta.count',
  };
}
