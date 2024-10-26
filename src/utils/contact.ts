// Utility functions for "Contact" section
import React from "react"
import {ToastType} from "../types.ts"

/*
 * Function to show the Toast component
 * @param type - type of toast message
 * @param text - text to display in the toast message
 * @returns JSX.Element - toast message
*/
export const showToast = (type: string, text: string, setToast: React.Dispatch<React.SetStateAction<ToastType>>): void => {
  setToast({ type, text })
  setTimeout(() => setToast(null), 4000)
}