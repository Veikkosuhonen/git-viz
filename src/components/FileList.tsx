import { Component, For, Match, Show, Switch, createSignal } from "solid-js";
import { File, selectFile, setState, state } from "~/state";
import { getRank } from "~/util/getRank";
import Rank from "./Rank";
import FileTree from "./FileTree";

const FileList: Component = () => {

  return (
    <>
      <div class="overflow-y-scroll overflow-x-hidden max-h-[55rem] p-2 flex flex-col items-stretch">
        <ul>
          <Show when={state.root}>
            <FileTree file={state.root!!} initiallyOpen />
          </Show>
        </ul>
      </div>
    </>
  )
}

export default FileList
