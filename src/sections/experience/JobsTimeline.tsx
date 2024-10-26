import {workExperiences} from "../../constants"
import {Job, JobsTimelineProps} from "../../types.ts"

const JobsTimeline = ({ setAnimationName }: JobsTimelineProps) => {
  return (
    <div className="work-content">
      <div className="sm:py-10 py-5 sm:px-5 px-2.5">
        { workExperiences.map((job: Job) => (
          <div
            key={job.id}
            className="work-content_container group"
            onClick={() => setAnimationName(job.animation.toLowerCase())}
            onPointerOver={() => setAnimationName(job.animation.toLowerCase())}
            onPointerOut={() => setAnimationName('idle')}
          >
            <div className="flex flex-col h-full justify-start items-center py-2">
              <div className="work-content_logo">
                <img src={job.icon} alt="logo" className="w-full h-full"/>
              </div>
              <div className="work-content_bar"/>
            </div>
            <div className="sm:p-5 px-2.5 py-5">
              <p className="font-bold text-white-800">{job.name}</p>
              <p className="text-sm mb-5">{job.pos} -- <span>{job.duration}</span></p>
              <p className="group-hover:text-white transition ease-in-out duration-500">{job.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobsTimeline