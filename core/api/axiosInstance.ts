import axios from "axios"

export const axiosInstance = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json"
  }

})

// Client-side helper to read cookies (for Authorization header)
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))

  return match ? decodeURIComponent(match.split("=")[1]) : null
}

// Attach Authorization: Bearer <accessToken> from cookies on all requests (including logout)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken")

    if (accessToken) {
      config.headers = config.headers ?? {}
      // Do not overwrite an explicit Authorization header if caller set one
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData &&
      config.headers
    ) {
      Object.keys(config.headers).forEach((key) => {
        if (key.toLowerCase() === "content-type") {
          delete (config.headers as any)[key]
        }
      })
    }

    return config
  },
  (error) => Promise.reject(error)
)
