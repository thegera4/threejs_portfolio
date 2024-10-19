import {Suspense, useState} from "react"
import {myProjects} from "../../constants"
import {Project} from "../../types.ts"
import NavigationControls from "./NavigationControls.tsx"
import TechStack from "./TechStack.tsx"
import LinkTextIcon from "../../components/LinkTextIcon.tsx"
import ProjectTexts from "./ProjectTexts.tsx"
import ProjectLogo from "./ProjectLogo.tsx"
import ProjectSpotlight from "./ProjectSpotlight.tsx"
import {Canvas} from "@react-three/fiber"
import {Center, OrbitControls} from "@react-three/drei"
import CanvasLoader from "../../components/CanvasLoader.tsx"
import DemoComputer from "../../components/DemoComputer.tsx"

const Projects = () => {

  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0)
  const currentProject: Project = myProjects[currentProjectIndex]

  return (
    <section className="c-space my-20">
      <p className="head-text">My work</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <ProjectSpotlight currentProject={currentProject}/>
          <ProjectLogo currentProject={currentProject}/>
          <ProjectTexts currentProject={currentProject}/>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <TechStack currentProject={currentProject}/>
            <LinkTextIcon href={currentProject.href} text="Check Demo" image="/assets/arrow-up.png"/>
          </div>
          <NavigationControls setCurrentProjectIndex={setCurrentProjectIndex} projects={myProjects}/>
        </div>
        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI}/>
            <directionalLight position={[10, 10, 5]}/>
            <Center>
              <Suspense fallback={<CanvasLoader/>}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture}/>
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false}/>
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default Projects