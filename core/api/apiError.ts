export const handleApiError = (error: any) => {
    if (error.response) {
        return error.response.data?.message || "Server error"
    } else if (error.request) {
        return "Network Error";
    } else {
        return "Something went wrong";
    }
}