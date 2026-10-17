import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'

/**
 * HeroAvatar — the developer's 3D character standing at the desk in the hero,
 * idly looking at the computer screen.
 *
 * It reuses the project's existing `idle.fbx` animation (the same natural
 * standing idle used in the Work Experience section), so the motion is a real
 * human idle rather than a hand-crafted approximation.
 */

// The desk slab in hacker-room.glb spans z −37 → +37 and sits at ~60–72cm,
// which is thigh height on a life-size character. The thighs stick out to about
// +12cm from the character's centre, so it has to stand in front of the desk
// (z ≈ −50) to avoid clipping through the desk top.
export const AVATAR_DESK_POSITION: [number, number, number] = [7.9, 0, -50]
// Maximum (life-size-ish) scale in desk units for standard laptop/mobile screens
export const AVATAR_SCALE = 94

/**
 * Fits the character to the available canvas height on standard screens
 * so the head never collides with the hero headline.
 */
function fitToViewport(canvasHeight: number): number {
  const t = (canvasHeight - 300) / 620
  return Math.min(1, Math.max(0.75, t))
}

/**
 * Calculates avatar scale across displays:
 * - On ultrawide monitors (aspect ratio >= 2.0 or width >= 2200px), fixes the scale to 56.4
 *   to keep the character proportional to the desk and away from the headline.
 * - On laptop and mobile screens, preserves the exact previous sizing (94 * fitToViewport).
 */
export function getAvatarScale(width: number, height: number, scale: number = AVATAR_SCALE): number {
  const aspect = width / (height || 1)
  const isUltrawide = aspect >= 2.0 || width >= 2200

  if (isUltrawide) {
    // Ultrawide scale (scale * 0.6 = 56.4 when scale is 94)
    return scale * 0.6
  }

  // Exact previous behavior for laptop and mobile screens
  return scale * fitToViewport(height)
}

export default function HeroAvatar({
  position = AVATAR_DESK_POSITION,
  scale = AVATAR_SCALE,
}: {
  position?: [number, number, number]
  scale?: number
} = {}) {
  const groupRef = useRef<THREE.Group>(null)
  const { width, height } = useThree((state) => state.size)

  const activeScale = useMemo(
    () => getAvatarScale(width, height, scale),
    [scale, width, height],
  )

  // Dedicated instance (the query param gives this a separate loader cache
  // entry) so the Experience section's Avatar3D — which reparents the shared
  // avatar.glb skeleton to run its FBX animations — can never interfere here.
  const { scene } = useGLTF('/models/avatar.glb?hero')

  const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx')
  idleAnimation[0].name = 'idle'
  const { actions } = useAnimations([idleAnimation[0]], groupRef)

  useEffect(() => {
    actions.idle?.reset().fadeIn(0.5).play()
    return () => {
      actions.idle?.fadeOut(0.5)
    }
  }, [actions])

  return (
    <group ref={groupRef} position={position} scale={activeScale}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/avatar.glb?hero')
