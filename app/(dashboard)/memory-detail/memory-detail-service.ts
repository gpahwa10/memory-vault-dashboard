import { handleApiError } from "@/core/api/apiError";
import { API_ENDPOINTS } from "@/core/api/apiEndpoints";
import { axiosInstance } from "@/core/api/axiosInstance";

export interface MemoryBookQuestion {
  id: string;
  key: string;
  questionText: string;
  inputType: string;
  isRequired: boolean;
  order: string;
}

export interface MemoryBookType {
  id: string;
  typeName: string;
  coverImage: string | null;
}

export interface MemoryBookDetail {
  id: string;
  userId: string;
  bookName: string;
  bookTypeId: string;
  bookType: MemoryBookType;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  questions: MemoryBookQuestion[];
}

export interface MemoryBookDetailResponse {
  book: MemoryBookDetail;
}

/** POST /api/books/:bookId/memories */
export interface CreateBookMemoryPayload {
  date: string;
  question: string;
  answer: string;
  status: string;
  images: string[];
  videoUrl: string | null;
}

export interface BookMemory {
  id: string;
  bookId: string;
  date: string;
  question: string;
  answer: string;
  status: string;
  images: string[];
  videoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookMemoryResponse {
  memory: BookMemory;
}

/** PATCH /api/books/:bookId/memories/:memoryId */
export interface UpdateBookMemoryPayload {
  question: string;
  answer: string;
  date: string;
  status: string;
  images: string[];
  videoUrl: string | null;
}

export interface UpdateBookMemoryResponse {
  memory: BookMemory;
}

/**
 * Book fields returned on some endpoints alongside template questions,
 * including top-level media placeholders (see GET book / memories responses).
 */
export interface MemoryBookDetailWithAssets extends MemoryBookDetail {
  images: string[];
  videoUrl: string | null;
  media: unknown[];
}

/** GET /api/books/:bookId/memories */
export interface GetBookMemoriesResponse {
  memories: BookMemory[];
  /** Included when the API embeds the book snapshot on the same payload. */
  book?: MemoryBookDetailWithAssets;
}

export const memoryDetailService = {
  getMemoryDetail: async (id: string, accessToken?: string) => {
    try {
      const response = await axiosInstance.get<MemoryBookDetailResponse>(
        API_ENDPOINTS.GET_MEMORY_DETAIL.replace(":id", id),
        {
          headers: accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : undefined,
        }
      )
      return response.data.book;
    } catch (error) {
      throw handleApiError(error)
    }
  },

  createBookMemory: async (
    bookId: string,
    payload: CreateBookMemoryPayload,
    accessToken?: string
  ) => {
    try {
      const response = await axiosInstance.post<CreateBookMemoryResponse>(
        API_ENDPOINTS.POST_BOOK_MEMORIES.replace(":id", bookId),
        payload,
        {
          headers: accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : undefined,
        }
      );
      return response.data.memory;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getBookMemories: async (bookId: string, accessToken?: string) => {
    try {
      const response = await axiosInstance.get<GetBookMemoriesResponse>(
        API_ENDPOINTS.GET_BOOK_MEMORIES.replace(":id", bookId),
        {
          headers: accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : undefined,
        }
      );
      return response.data.memories;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateBookMemory: async (
    bookId: string,
    memoryId: string,
    payload: UpdateBookMemoryPayload,
    accessToken?: string
  ) => {
    try {
      const url = API_ENDPOINTS.PATCH_BOOK_MEMORY.replace(
        ":bookId",
        bookId
      ).replace(":memoryId", memoryId);
      const response = await axiosInstance.patch<UpdateBookMemoryResponse>(
        url,
        payload,
        {
          headers: accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : undefined,
        }
      );
      return response.data.memory;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};