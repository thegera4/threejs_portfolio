import React from "react"
import {GLTF} from "three-stdlib"
import {Mesh} from "three"
import * as THREE from "three"

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
  //ringPosition: number[]
  javaLogoPosition: number[]
  deskPosition: number[]
  reactLogoPosition: number[]
  jsLogoPosition: number[]
  cubePosition: number[]
}
/** Custom type for calculateSizes function */
export type CalculateSizesType = (args: CalculateSizesArgsType) => CalculateSizesReturnType

/** ThreeDModel component props */
export interface ThreeDModelProps {
  sizes: CalculateSizesReturnType
  isMobile: boolean
}

/** FloatingIcons component props */
export interface FloatingIconsProps {
  sizes: CalculateSizesReturnType
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

/** Custom type for JavaLogo GLTF */
export type JavaLogoGLTF = GLTF & {
  nodes: {
    Cube_0: THREE.Mesh
    Plane_0: THREE.Mesh
    Plane001_0: THREE.Mesh
    Torus001_0: THREE.Mesh
    Torus000_0: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
  }
}

/** JavaLogo component props */
export interface JavaLogoProps {
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

/** Custom type for JSLogo GLTF */
export interface JSLogoGLTF {
  nodes: { Object_2: THREE.Mesh }
  materials: { mat_3220964: THREE.MeshStandardMaterial }
}

/** JSLogo component props */
export interface JSLogoProps {
  position: [number, number, number]
}

/** Type for ProjectTag */
export type ProjectTag = { id: number, name: string, path: string }
/** Type for a Project */
export interface Project {
  title: string
  desc: string
  subdesc: string
  href: string
  texture: string
  logo: string
  logoStyle: {
    backgroundColor: string
    border: string
    boxShadow: string
    background?: string
  }
  spotlight: string
  tags: ProjectTag[]
}

/** Type for handleNavigation utility function */
export type handleNavigationType = (direction: string, setter: React.Dispatch<React.SetStateAction<number>>, projects: Project[]) => void

/** Type for NavigationControls Component */
export interface NavigationControlsProps {
  setCurrentProjectIndex: React.Dispatch<React.SetStateAction<number>>
  projects: Project[]
}

/** Type for TechStack Component */
export interface TechStackProps {
  currentProject: Project
}

/** Type for LinkTextIcon Component */
export interface LinkTextIconProps {
  href: string
  text: string
  image: string
}

/** Type for ProjectTexts Component */
export interface ProjectTextsProps {
  currentProject: Project
}

/** Type for ProjectLogo Component */
export interface ProjectLogoProps {
  currentProject: Project
}

/** Type for ProjectSpotlight Component */
export interface ProjectSpotlightProps {
  currentProject: Project
}

/** Custom type for DemoPCGLTF */
export type DemoPCGLTF = GLTF & {
  nodes: {
    ['monitor-screen']: THREE.Mesh
    ['Monitor-B-_computer_0_1']: THREE.Mesh
    ['Monitor-B-_computer_0_2']: THREE.Mesh
    ['Monitor-B-_computer_0_3']: THREE.Mesh
    ['Monitor-B-_computer_0_4']: THREE.Mesh
    ['Monitor-B-_computer_0_5']: THREE.Mesh
    ['Monitor-B-_computer_0_6']: THREE.Mesh
    ['Monitor-B-_computer_0_7']: THREE.Mesh
    ['Monitor-B-_computer_0_8']: THREE.Mesh
  }
  materials: {
    computer: THREE.MeshStandardMaterial
    base__0: THREE.MeshStandardMaterial
    Material_36: THREE.MeshStandardMaterial
    Material_35: THREE.MeshStandardMaterial
    Material_34: THREE.MeshStandardMaterial
    keys: THREE.MeshStandardMaterial
    keys2: THREE.MeshStandardMaterial
    Material_37: THREE.MeshStandardMaterial
  }
}

/** DemoComputer component props */
export interface DemoComputerProps {
  texture: string
}

/** ProjectsComputer component props */
export interface ProjectsComputerProps {
  currentProject: Project
}

/** Job type */
export type Job = {
  id: number
  name: string
  pos: string
  duration: string
  title: string
  icon: string
  animation: string
}
/** WorkExperiencesType array */
export type WorkExperiencesType = Job[]

/** Form data type */
export type ContactFormData = { name: string, email: string, message: string }
/** Form component props */
export interface FormProps {
  formData: ContactFormData
  isLoading: boolean
  formRef: React.RefObject<HTMLFormElement>
  handleSubmit: (e: React.FormEvent) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

/** Toast type */
export type ToastType = { type: string; text: string } | null
/** Toast component props */
export interface ToastProps {
  type: string
  text: string
}

/** Custom type for Avatar3DProps */
export interface Avatar3DProps {
  animationName: string
  position: [number, number, number]
  scale: number
}

/** Custom type for Avatar3DGLTF */
export type Avatar3DGLTF = GLTF & {
  nodes: {
    EyeLeft: THREE.SkinnedMesh
    EyeRight: THREE.SkinnedMesh
    Wolf3D_Head: THREE.SkinnedMesh
    Wolf3D_Teeth: THREE.SkinnedMesh
    Wolf3D_Hair: THREE.SkinnedMesh
    Wolf3D_Glasses: THREE.SkinnedMesh
    Wolf3D_Outfit_Top: THREE.SkinnedMesh
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh
    Wolf3D_Body: THREE.SkinnedMesh
    Hips: THREE.Bone
  }
  materials: {
    Wolf3D_Eye: THREE.MeshStandardMaterial
    Wolf3D_Skin: THREE.MeshStandardMaterial
    Wolf3D_Teeth: THREE.MeshStandardMaterial
    Wolf3D_Hair: THREE.MeshStandardMaterial
    Wolf3D_Glasses: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial
    Wolf3D_Body: THREE.MeshPhysicalMaterial
  }
}

/** Custom type for PersonalAvatarProps */
export interface PersonalAvatarProps {
  animationName: string
}

/** Custom type for JobsTimelineProps */
export interface JobsTimelineProps {
  setAnimationName: React.Dispatch<React.SetStateAction<string>>
}

/** Client review type */
/*export type ClientReview = {
  id: number
  name: string
  position: string
  review: string
  img: string
}*/
/** Client reviews array */
/*export type ClientReviewsType = ClientReview[]*/