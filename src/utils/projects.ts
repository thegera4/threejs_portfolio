// Utility functions for "Projects" section
import React from "react"
import {handleNavigationType, Project} from "../types.ts"
import {STRINGS} from "../constants/Strings.ts"

/**
 * Function to handle navigation between projects
 *  @param direction - string value to determine the direction of navigation
 *  @param setter - function to set the current project index
 *  @param projects - array of projects
 *  @returns void - nothing
 * */
export const handleNavigation: handleNavigationType = (
  direction: string, setter: React.Dispatch<React.SetStateAction<number>>, projects: Project[]
): void => {
    setter((prevIndex: number) => {
      if(direction === STRINGS.PREVIOUS){
        return prevIndex === 0 ? projects.length - 1 : prevIndex - 1
      } else {
        return prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      }
    })
}