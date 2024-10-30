import Globe from "react-globe.gl"
import Button from "../../components/Button.tsx"

const Earth = () => {
  return (
    <div className="col-span-1 xl:row-span-4">
      <div className="grid-container">
        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
          <Globe
            height={326}
            width={326}
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere={true}
            showGraticules={false}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            labelsData={[{lat: 25.54389, lng: -103.41898, text: "I'm here!", size: 60}]}
            labelColor={() => "red"}
          />
        </div>
        <div>
          <p className="grid-headtext">I'm open to work across most timezones</p>
          <p className="grid-subtext">I'm based in Torreon, Mexico but open to any remote or on-site projects.</p>
          <Button name="Contact Me" isBeam={true} containerClass="w-full mt-10" href="#contact"/>
        </div>
      </div>
    </div>
  )
}
export default Earth