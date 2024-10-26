/*import {clientReviews} from "../../constants"
import {ClientReview} from "../../types.ts"

const Clients = () => {
  return (
    <section className="c-space my-20">
      <h3 className="head-text">Hear from my clients</h3>
      <div className="client-container">
        { clientReviews.map((item: ClientReview) => (
          <div key={item.id} className="client-review">
            <div>
              <p className="text-white font-light">{item.review}</p>
              <div className="client-content">
                <div className="flex gap-3">
                  <img src={item.img} alt={item.name} className="rounded-full w-12 h-12" />
                  <div className="flex flex-col">
                    <p className="font-semibold text-white-800">{item.name}</p>
                    <p className="text-white-500 md:text-base text-sm">{item.position}</p>
                  </div>
                </div>
                <div className="flex self-end items-center gap-2">
                  { Array.from({length: 5}, (_: unknown, idx: number) => (
                    <img src="/assets/star.png" alt="star" key={idx} className="w-5 h-5" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
export default Clients*/