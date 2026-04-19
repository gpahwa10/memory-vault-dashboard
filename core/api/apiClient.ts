import { handleApiError } from "./apiError"
import { axiosInstance } from "./axiosInstance"

export const apiClient = {
    get: async <T>(url: string): Promise<T> => {
        try{
            const res = await axiosInstance.get(url)
            return res.data as T;
        }catch(error){
            throw handleApiError(error)
        }
    },

    post: async <T, D = unknown>(url: string, data?: D): Promise<T> => {
        try{
            const res = await axiosInstance.post(url, data)
            return res.data as T;
        }catch(error){
            throw handleApiError(error)
        }
    },

    put: async <T, D = unknown>(url: string, data?: D): Promise<T> => {
        try{
            const res = await axiosInstance.put(url, data)
            return res.data as T;
        }catch(error){
            throw handleApiError(error)
        }
    },

    delete: async <T>(url: string): Promise<T> => {
        try{
            const res = await axiosInstance.delete(url)
            return res.data as T;
        }catch(error){
            throw handleApiError(error)
        }
    }   ,

    patch: async <T, D = unknown>(url: string, data?: D): Promise<T> => {
        try{
            const res = await axiosInstance.patch(url, data)
            return res.data as T;
        }catch(error){
            throw handleApiError(error)
        }
    }
}