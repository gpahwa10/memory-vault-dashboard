"use client"

import { createContext, useContext } from "react"

export type OpenAddMemoryOptions = {
  bookId?: string
}

type AddMemoryContextValue = {
  openAddMemory: (options?: OpenAddMemoryOptions) => void
}

const AddMemoryContext = createContext<AddMemoryContextValue | null>(null)

export function useAddMemory() {
  const ctx = useContext(AddMemoryContext)
  return ctx?.openAddMemory ?? ((_options?: OpenAddMemoryOptions) => {})
}

export const AddMemoryProvider = AddMemoryContext.Provider
