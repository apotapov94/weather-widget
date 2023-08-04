export interface City {
  id: number
  cityName: string
  region: string
  temp: number
  pressure: number
  humidity: number
  feelsLike: number
  description: string
  icon: string
  visibility: number
  wind: {
    speed: number
    deg: number
  },
}