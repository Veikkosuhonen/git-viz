import { For } from "solid-js"
import { setState, state } from "~/state"

const Team = () => {

  const toggleTeamMember = (name: string) => {
    setState("teamMembers", t => t.name === name, "enabled", (e) => !e)
  }

  return (
    <>
      <div class="p-2 flex items-center gap-2 border-b border-slate-300 bg-slate-100">
        <h2>Toggle team members</h2>
      </div>
      <div class="overflow-y-scroll overflow-x-hidden max-h-[10rem] p-2 flex flex-col items-stretch">
        <For each={state.teamMembers}>
          {member => (
            <button onClick={() => toggleTeamMember(member.name)}
            class="flex text-left text-sm text-slate-600 text-nowrap rounded-md hover:bg-amber-300 active:bg-amber-400 transition-all duration-150"
            >
              {member.name}
              <span 
                class="w-4 h-4 rounded-full inline-block ml-auto bg-amber-500 border border-amber-600"
                classList={{
                  "bg-transparent": !member.enabled,
                }}
              />
            </button>
          )}
        </For>
      </div>
    </>
  )
}

export default Team