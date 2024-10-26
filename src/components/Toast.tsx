import {ToastProps} from "../types.ts"

const Toast = ({type, text }: ToastProps) => {
  return (
    <div className={`toast-container ${type === "success" ? "bg-green-700" : "bg-red-700"}`}>
      {text}
    </div>
  )
}
export default Toast