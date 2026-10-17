import { readFileSync } from 'node:fs'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// polyfill browser globals so GLTFLoader can load in Node (textures become dummies)
globalThis.self = globalThis
if (!globalThis.createImageBitmap) {
  globalThis.createImageBitmap = async () => ({ width: 1, height: 1 })
}

const file = process.argv[2]
const names = process.argv.slice(3)
const buf = readFileSync(file)
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)

const loader = new GLTFLoader()
const gltf = await new Promise((resolve, reject) => {
  loader.parse(ab, '', resolve, reject)
})

gltf.scene.updateMatrixWorld(true)

function boxOf(obj) {
  const box = new THREE.Box3().setFromObject(obj)
  const c = box.getCenter(new THREE.Vector3())
  const s = box.getSize(new THREE.Vector3())
  return { name: obj.name, center: c, size: s }
}

// whole scene
const whole = boxOf(gltf.scene)
console.log('WHOLE', whole.name, 'center', whole.center.toArray().map(x=>+x.toFixed(3)).join(','), 'size', whole.size.toArray().map(x=>+x.toFixed(3)).join(','))

gltf.scene.traverse((o) => {
  if (!o.isMesh) return
  const name = o.name
  if (names.length === 0 || names.some(n => name.includes(n))) {
    const b = boxOf(o)
    console.log(`${name.padEnd(32)} center=[${b.center.toArray().map(x=>+x.toFixed(3)).join(', ')}] size=[${b.size.toArray().map(x=>+x.toFixed(3)).join(', ')}]`)
  }
})
