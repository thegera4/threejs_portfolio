import { readFileSync } from 'node:fs'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

globalThis.self = globalThis
if (!globalThis.createImageBitmap) globalThis.createImageBitmap = async () => ({ width: 1, height: 1 })

const buf = readFileSync('public/models/avatar.glb')
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
const loader = new GLTFLoader()
const gltf = await new Promise((res, rej) => loader.parse(ab, '', res, rej))
const scene = SkeletonUtils.clone(gltf.scene)

// group placement in DESK space (1 unit ~ 1cm)
const S = 94
const GX = 7.9
const GY = -40
const GZ = -35
scene.position.set(GX, GY, GZ)
scene.scale.setScalar(S)

const bone = {}
scene.traverse(o => { if (o.isBone) bone[o.name] = o })

const _y = new THREE.Vector3(), _z = new THREE.Vector3(), _x = new THREE.Vector3()
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _pq = new THREE.Quaternion()

// orient bone's local +Y toward world direction `dir`, with `up` controlling roll (approx +Z local)
function orientY(b, dir, up) {
  const y = _y.copy(dir).normalize()
  const z = _z.copy(up).normalize()
  z.addScaledVector(y, -z.dot(y))
  if (z.lengthSq() < 1e-6) {
    const ref = Math.abs(y.y) < 0.99 ? new THREE.Vector3(0,1,0) : new THREE.Vector3(0,0,1)
    z.copy(ref).addScaledVector(y, -ref.dot(y))
  }
  z.normalize()
  const x = _x.crossVectors(y, z).normalize()
  z.crossVectors(x, y).normalize()
  _m.makeBasis(x, y, z)
  _q.setFromRotationMatrix(_m)
  b.parent.updateWorldMatrix(true, false)
  _pq.copy(b.parent.getWorldQuaternion(new THREE.Quaternion())).invert()
  b.quaternion.copy(_pq.multiply(_q))
}

// orient bone's local +Z toward world direction `dir`
function orientZ(b, dir, up) {
  const z = _z.copy(dir).normalize()
  const y = _y.copy(up).normalize()
  y.addScaledVector(z, -y.dot(z))
  if (y.lengthSq() < 1e-6) {
    const ref = Math.abs(z.z) < 0.99 ? new THREE.Vector3(0,0,1) : new THREE.Vector3(0,1,0)
    y.copy(ref).addScaledVector(z, -ref.dot(z))
  }
  y.normalize()
  const x = _x.crossVectors(y, z).normalize()
  y.crossVectors(z, x).normalize()
  _m.makeBasis(x, y, z)
  _q.setFromRotationMatrix(_m)
  b.parent.updateWorldMatrix(true, false)
  _pq.copy(b.parent.getWorldQuaternion(new THREE.Quaternion())).invert()
  b.quaternion.copy(_pq.multiply(_q))
}

const FWD = new THREE.Vector3(0, 0, 1)   // forward (+Z, toward monitor)
const UP = new THREE.Vector3(0, 1, 0)
const DOWN = new THREE.Vector3(0, -1, 0)

// Two-bone IK: given shoulder, target, lengths, and a pole hint (elbow bend dir),
// returns the elbow position.
function solveElbow(shoulder, target, l1, l2, pole) {
  const d = new THREE.Vector3().subVectors(target, shoulder)
  const c = Math.min(d.length(), l1 + l2 - 1e-4)
  d.normalize()
  const cosA = (l1 * l1 + c * c - l2 * l2) / (2 * l1 * c)
  const a = Math.acos(Math.max(-1, Math.min(1, cosA)))
  // bend direction: project pole onto plane perpendicular to d
  const bend = pole.clone().sub(d.clone().multiplyScalar(pole.dot(d)))
  if (bend.lengthSq() < 1e-6) bend.set(0, 1, 0).sub(d.clone().multiplyScalar(d.y))
  bend.normalize()
  return shoulder.clone()
    .addScaledVector(d, l1 * Math.cos(a))
    .addScaledVector(bend, l1 * Math.sin(a))
}

function sit() {
  const thigh = new THREE.Vector3(0, -0.12, 0.99).normalize()
  const shin = new THREE.Vector3(0, -0.99, 0.05).normalize()
  orientY(bone.LeftUpLeg, thigh, FWD)
  orientY(bone.RightUpLeg, thigh.clone(), FWD)
  orientY(bone.LeftLeg, shin, FWD)
  orientY(bone.RightLeg, shin.clone(), FWD)
  orientY(bone.LeftFoot, new THREE.Vector3(0, 0.05, 1), UP)
  orientY(bone.RightFoot, new THREE.Vector3(0, 0.05, 1), UP)
}

function typePose() {
  // torso upright, slight forward lean; head looks at screen
  orientY(bone.Spine, new THREE.Vector3(0, 0.99, 0.12), FWD)
  orientY(bone.Spine1, new THREE.Vector3(0, 0.99, 0.12), FWD)
  orientY(bone.Spine2, new THREE.Vector3(0, 0.96, 0.28), FWD)
  orientY(bone.Neck, new THREE.Vector3(0, 0.96, 0.28), FWD)
  orientZ(bone.Head, new THREE.Vector3(0, -0.22, 0.975), UP)

  // arm lengths (avatar local): upper 0.285, forearm 0.252 -> in desk units *S
  const L1 = 0.285 * S, L2 = 0.252 * S
  const shL = bone.LeftArm.getWorldPosition(new THREE.Vector3())
  const shR = bone.RightArm.getWorldPosition(new THREE.Vector3())
  // hand targets on keyboard
  const tL = new THREE.Vector3(4.0, 72, -14)
  const tR = new THREE.Vector3(11.8, 72, -14)
  // elbows bend down-outward
  const eL = solveElbow(shL, tL, L1, L2, DOWN.clone().add(new THREE.Vector3(-1, 0, 0)))
  const eR = solveElbow(shR, tR, L1, L2, DOWN.clone().add(new THREE.Vector3(1, 0, 0)))
  orientY(bone.LeftArm, eL.clone().sub(shL), FWD)
  orientY(bone.RightArm, eR.clone().sub(shR), FWD)
  orientY(bone.LeftForeArm, tL.clone().sub(eL), UP)
  orientY(bone.RightForeArm, tR.clone().sub(eR), UP)
  orientZ(bone.LeftHand, DOWN, FWD)
  orientZ(bone.RightHand, DOWN, FWD)
}

function p(name) {
  const o = bone[name]
  const v = o.getWorldPosition(new THREE.Vector3())
  return v.toArray().map(x => +x.toFixed(1)).join(', ')
}

// helper to turn torso toward camera: forward rotates from +Z to -Z (desk space)
function turnForward(amount) { // amount 0..1
  const theta = amount * 2.7 // radians, ~155 deg
  return new THREE.Vector3(Math.sin(theta), 0, Math.cos(theta))
}

function wavePose(amount) {
  const f = turnForward(amount)
  // torso turn + slight lean back, head toward camera
  orientY(bone.Spine1, new THREE.Vector3(0, 0.97, 0.2), f)
  orientY(bone.Spine2, new THREE.Vector3(0, 0.95, 0.28), f)
  orientY(bone.Neck, new THREE.Vector3(0, 0.95, 0.28), f)
  orientZ(bone.Head, f.clone().setY(0.1).normalize(), UP)
  // raise RIGHT arm (right is -X side)
  const upOut = new THREE.Vector3(-0.35, 0.88, 0.3).normalize()
  const upMore = new THREE.Vector3(-0.25, 0.92, 0.3).normalize()
  orientY(bone.RightArm, upOut, f)
  orientY(bone.RightForeArm, upMore, f)
  orientZ(bone.RightHand, f, UP)
  // left arm stays near keyboard-ish (relaxed)
  const shL = bone.LeftArm.getWorldPosition(new THREE.Vector3())
  const L1 = 0.285 * S, L2 = 0.252 * S
  const tL = new THREE.Vector3(4, 74, -14)
  const eL = solveElbow(shL, tL, L1, L2, DOWN)
  orientY(bone.LeftArm, eL.clone().sub(shL), f)
  orientY(bone.LeftForeArm, tL.clone().sub(eL), UP)
  orientZ(bone.LeftHand, DOWN, f)
}

sit()
scene.updateMatrixWorld(true)
console.log('=== SITTING/TYPING POSE (desk space, units ~cm) ===')
console.log('hips      ', p('Hips'))
console.log('knee L    ', p('LeftLeg'), ' knee R   ', p('RightLeg'))
console.log('ankle L   ', p('LeftFoot'), ' ankle R  ', p('RightFoot'))
console.log('shoulder L', p('LeftArm'), ' shoulder R', p('RightArm'))
console.log('elbow L   ', p('LeftForeArm'), ' elbow R ', p('RightForeArm'))
console.log('hand L    ', p('LeftHand'), ' hand R  ', p('RightHand'))
console.log('head      ', p('Head'))
console.log('--- targets ---')
console.log('floor y=0 | desk top y~71.5 | keyboard (7.9, 71.7, -14.3) | monitor (7.9, 95, 15)')

// verify wave pose
wavePose(1)
scene.updateMatrixWorld(true)
console.log('\n=== WAVE POSE (amount=1) ===')
console.log('head      ', p('Head'))
console.log('right hand', p('RightHand'), ' (should be raised up near head)')
console.log('right elb ', p('RightForeArm'))
console.log('right sh  ', p('RightArm'))
console.log('left hand ', p('LeftHand'))
