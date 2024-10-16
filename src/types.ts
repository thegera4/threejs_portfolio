import React from "react"
import {GLTF} from "three-stdlib"
import {Mesh} from "three"

/** Navigation Links */
export type NavLink = { id: number, name: string, href: string }
/** Navigation Links Array */
export type NavLinks = NavLink[]

/** Custom type for Hero 3D Model*/
export interface CustomGLTF extends GLTF {
  nodes: {
    computer_computer_mat_0: Mesh
    server_server_mat_0: Mesh
    vhs_vhsPlayer_mat_0: Mesh
    shelf_stand_mat_0: Mesh
    keyboard_mat_mat_mat_0: Mesh
    arm_arm_mat_0: Mesh
    Tv_tv_mat_0: Mesh
    table_table_mat_0: Mesh
    Cables_cables_mat_0: Mesh
    props_props_mat_0: Mesh
    screen_screens_0: Mesh
    screen_glass_glass_0: Mesh
    Ground_ground_mat_0: Mesh
    peripherals_key_mat_0: Mesh
  }
  materials: { [key: string]: Mesh['material'] }
}

/** Custom types for calculateSizes arguments */
export type CalculateSizesArgsType ={ isSmall: boolean, isMobile: boolean, isTablet: boolean }
/** Custom types for calculateSizes return */
export interface CalculateSizesReturnType {
  deskScale: number
  ringPosition: number[]
  deskPosition: number[]
  reactLogoPosition: number[]
  targetPosition: number[]
  cubePosition: number[]
}

/** ThreeDModel component props */
export interface ThreeDModelProps {
  sizes: CalculateSizesReturnType
  isMobile: boolean
}

/** FloatingIcons component props */
export interface FloatingIconsProps {
  sizes: CalculateSizesReturnType
}

/** Target component props */
export interface TargetProps {
  position: [number, number, number]
}

/** ReactLogo component props */
export interface ReactLogoProps {
  position: [number, number, number]
}

/** Custom type for ReactLogo GLTF */
export interface ReactLogoGLTF {
  nodes: { 'React-Logo_Material002_0': Mesh }
  materials: { 'Material.002': Mesh['material'] }
}

/** Cube component props */
export interface CubeProps {
  position: [number, number, number]
}

/** Custom type for Cube GLTF */
export interface CubeGLTF {
  nodes: { Cube: Mesh }
}

/** Rings component props */
export interface RingsProps {
  position: [number, number, number]
}

/** HeroCamera component props */
export interface HeroCameraProps {
  children: React.ReactNode
  isMobile: boolean
}

/** Button component props */
export interface ButtonProps {
  name: string
  isBeam: boolean
  containerClass: string
}