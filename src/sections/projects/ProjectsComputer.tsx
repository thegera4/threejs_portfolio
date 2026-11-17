import {Suspense} from "react"
import {Canvas} from "@react-three/fiber"
import {Center, OrbitControls} from "@react-three/drei"
import CanvasLoader from "../../components/CanvasLoader.tsx"
import DemoComputer from "../../components/DemoComputer.tsx"
import {ProjectsComputerProps} from "../../types.ts"
import GithubLogo from "../../components/GithubLogo.tsx"
import DemoPhone from "../../components/DemoPhone.tsx"

const ProjectsComputer = ({currentProject}: ProjectsComputerProps) => {
  const hasTexture = Boolean(currentProject.texture)

  return (
    <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
      <Canvas>
        <ambientLight intensity={Math.PI}/>
        <directionalLight position={[10, 10, 5]}/>
        <Center>
          <Suspense fallback={<CanvasLoader/>}>
            { !hasTexture ?
                <group scale={13} position={[-16, -26.3, -110]} rotation={[0.15, 0.18, -6.34]}>
                  <GithubLogo/>
                </group>
                : currentProject.mobile ?
                <group scale={25} position={[0, 0, 0]} rotation={[0, -0.2, 0]}>
                  <DemoPhone texture={currentProject.texture}/>
                </group>
                :
              <group scale={11.5} position={[0, -0.15, 0]} rotation={[0.12, -0.2, 0]}>
                <DemoComputer texture={currentProject.texture}/>
              </group>
            }
          </Suspense>
        </Center>
        { hasTexture && <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false}/> }
      </Canvas>
    </div>
  )
}

export default ProjectsComputer