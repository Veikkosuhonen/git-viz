import { Component, createSignal } from "solid-js"
import Dismiss from "solid-dismiss"

const InfoButton: Component<{
  text: string
}> = (props) => {
  const [show, setShow] = createSignal(false)
  let btnElement: HTMLButtonElement | undefined = undefined

  return (
    <>
      <button class="ml-4 rounded-full bg-slate-500 hover:bg-indigo-500 transition-colors duration-150 text-slate-100 text-sm px-1" ref={btnElement}>
        ?
      </button>
      <Dismiss
        menuButton={btnElement}
        open={show}
        setOpen={setShow}
        class="absolute z-10 bg-slate-50/60 backdrop-blur-md rounded shadow-lg shadow-slate-800/50"
      >
        <p class="text-xs p-2">{props.text}</p>
      </Dismiss>
    </>
  )
}

export default InfoButton