import { apiClient } from "@/core/api/apiClient"
import { API_ENDPOINTS } from "@/core/api/apiEndpoints"

export interface BookType {
    id: string;
    typeName: string;
    coverImage: string | null;
    createdAt: string;
    updatedAt: string;
    questions: Question[]
}

export interface Question {
    id: string;
    key: string;
    questionText: string;
    inputType: string;
    isRequired: boolean;
    order: string;
}

export interface BookTypeResponse {
    bookTypes: BookType[]
}


export interface CreateBookRequest {
    bookName: string;
    bookTypeId: string;
    metadata: BookMetadata;
}

export interface CreateBookResponse {
    book: BookResponse;
}

export interface GetMyBooksResponse {
    books: BookResponse[];
}

export interface BookResponse {
    id: string;
    userId: string;
    bookName: string;
    bookTypeId: string;
    bookType: {
        id: string;
        typeName: string;
        coverImage: string | null;
    };
    metadata: BookMetadata;
    createdAt: string;
    updatedAt: string;
}

export interface BookMetadata {
    [key: string]: string;
}

export const appService = {
    getBookTypes: async () => {
        const response = await apiClient.get<BookTypeResponse>(API_ENDPOINTS.GET_BOOK_TYPES)
        return response
    },

    createBook: async (request: CreateBookRequest) => {
        const response = await apiClient.post<CreateBookResponse>(API_ENDPOINTS.CREATE_BOOK, request)
        return response
    },

    getMyBooks: async () => {
        const response = await apiClient.get<GetMyBooksResponse>(API_ENDPOINTS.GET_MY_BOOKS)
        return response
    }
} 
