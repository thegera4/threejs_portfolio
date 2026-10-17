const Name = () => {
  return (
    <div className="col-span-1 xl:row-span-3">
      <div className="grid-container">
        <div className="w-full sm:h-[276px] h-fit flex items-center justify-center">
          <img
            src="https://github.com/thegera4.png"
            alt="Juan Gerardo Medellin"
            className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-3xl shadow-2xl border border-white/10"
          />
        </div>
        <div>
          <p className="grid-headtext">About Me</p>
          <p className="grid-subtext">
            With 5 years of professional experience as a full stack developer,
            I enjoy learning new things, video games and music.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Name