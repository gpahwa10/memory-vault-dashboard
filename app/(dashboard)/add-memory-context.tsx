"use client"

import { createContext, useContext } from "react"

type AddMemoryContextValue = {
  openAddMemory: () => void
}

const AddMemoryContext = createContext<AddMemoryContextValue | null>(null)

export function useAddMemory() {
  const ctx = useContext(AddMemoryContext)
  return ctx?.openAddMemory ?? (() => {})
}

export const AddMemoryProvider = AddMemoryContext.Provider
