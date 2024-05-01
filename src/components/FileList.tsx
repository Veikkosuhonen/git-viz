import { createAsync } from "@solidjs/router";
import { Component, For, createComputed } from "solid-js";
import { loadFileTree } from "~/lib/api";

type File = {
  name: string
  children?: File[]
}

const FileList: Component = () => {
  const files = createAsync(() => loadFileTree().then(f => {
    const files: File[] = []

    const findAndAddChildren = (node: File) => {
      if (node.children) {
        node.children.forEach((child: File) => {
          findAndAddChildren(child)
        })
      } else {
        files.push(node)
      }
    }

    findAndAddChildren(f)

    return files
  }))

  return (
    <>
      <h2 class="text-xl border-b border-slate-300 p-2">File list</h2>
      <div class="overflow-y-scroll overflow-x-hidden max-h-[50rem] p-2">
        <For each={files()}>
          {f => (
            <p class="text-sm text-slate-600 text-nowrap rounded-md hover:bg-amber-300 transition-colors">
              {f.name.split("/").slice(0, -1).join(' / ').concat(' / ')}
              <span class="text-base text-slate-800 font-medium">
                {f.name.split("/").splice(-1)}
              </span>
            </p>
          )}
        </For>
      </div>
    </>
  )
}

export default FileList
