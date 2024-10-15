import {GLTF} from "three-stdlib";
import {Mesh} from "three";

export type NavLink = { id: number, name: string, href: string }
export type NavLinks = NavLink[]

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