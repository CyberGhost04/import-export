const API_BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.VITE_API_HOST
    ? `https://${import.meta.env.VITE_API_HOST}/api`
    : 'http://localhost:8000/api')

export async function getTradeData() {
  const response = await fetch(`${API_BASE_URL}/trade-data`)
  if (!response.ok) {
    throw new Error(`Trade data request failed (${response.status})`)
  }
  return response.json()
}
