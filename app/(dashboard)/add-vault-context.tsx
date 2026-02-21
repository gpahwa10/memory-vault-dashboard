"use client"

import { createContext, useContext } from "react"

type AddVaultContextValue = {
  openAddVault: () => void
}

const AddVaultContext = createContext<AddVaultContextValue | null>(null)

export function useAddVault() {
  const ctx = useContext(AddVaultContext)
  return ctx?.openAddVault ?? (() => {})
}

export const AddVaultProvider = AddVaultContext.Provider
