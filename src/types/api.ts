export type Hive = {
  id: number
  user_id: number
  name: string
  weight: number | null
  temperature: number | null
  humidity: number | null
  queen_id: number | null
  created_at: string
  updated_at: string
}

export type ApiResponse<T> = {
  api_version: string
  api_name: string
  count: number
  status: number
  status_message: string
  data: T
}
