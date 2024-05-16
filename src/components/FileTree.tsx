import { Component, For, Match, Show, Switch, createSignal } from "solid-js";
import { File, selectFile, setState, state } from "~/state";

const FileTree: Component<{
  file: File;
  initiallyOpen?: boolean;
}> = (props) => {
  const [open, setOpen] = createSignal(props.initiallyOpen ?? false);
  const hasSlash = props.file.name.includes("/");
  const name = hasSlash ? props.file.name.slice(props.file.name.lastIndexOf("/") + 1) : props.file.name;
  const highlighted = () => state.highlightedDirId === props.file.id;
  const selected = () => state.selectedId === props.file.id;
  return (
    <li class="text-sm flex flex-col items-stretch text-slate-600">
      <Switch>
        <Match when={props.file.children}>
          <div class="flex">
            <button class="flex-grow text-left rounded transition-colors px-1 hover:bg-slate-300" classList={{ "text-slate-900": open() }} onClick={() => setOpen(!open())}>
              {open() ? "👇" : "👉"} {name}
            </button>
            <button class="text-xs py-1 px-2 rounded border transition-colors" classList={{ "bg-amber-300 border-amber-400": highlighted(), "hover:bg-slate-300": !highlighted() }} onClick={() => {
              setState("highlightedDirId", highlighted() ? null : props.file.id)
            }}>
              {highlighted() ? "🔍" : "🔎"}
            </button>
          </div>
          <Show when={open()}>
            <ul class="pl-6 border-l border-slate-400">
              <For each={props.file.children?.toSorted((a, b) => a.name.localeCompare(b.name)).toSorted((a, b) => (b.children ? 1 : 0) - (a.children ? 1 : 0))}>
                {child => <FileTree file={child} />}
              </For>
            </ul>
          </Show>
        </Match>
        <Match when={!props.file.children}>
          <button class="py-1 px-1 text-left transition-colors rounded" classList={{ "bg-amber-300 text-slate-900": selected(), "hover:bg-slate-300": !selected() }} onClick={() => {
            selectFile(selected() ? null : props.file.id)
          }}>
            {"📄"} {name}
          </button>
        </Match>
      </Switch>
    </li>
  );
}

export default FileTree;