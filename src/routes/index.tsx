import { Panel, PanelGroup, ResizeHandle } from "solid-resizable-panels";
import { Visualization } from "~/components/Visualization";

export default function Home() {
  return (
    <PanelGroup direction="row" class="flex-grow flex w-[100vw] justify-between">
      <Panel id="left" class="basis-1/4 p-2 bg-slate-200 shadow-lg text-slate-200">
        <p class="h-96 p-4 bg-slate-100 rounded-md border border-slate-300">
          Controls
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam beatae ea harum numquam molestias iure repellat accusamus earum, minus obcaecati natus magni ducimus explicabo odit fugiat provident cumque, exercitationem eius.
        </p>
      </Panel>
      <ResizeHandle />
      <Panel id="center" class="basis-1/2 p-2 flex flex-col">
        <Visualization />
      </Panel>
      <ResizeHandle />
      <Panel id="right" class="basis-1/4 p-2 bg-slate-200 shadow-lg text-slate-200">
        <p class="h-96 p-4 bg-slate-100 rounded-md border border-slate-300">
          Details
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam beatae ea harum numquam molestias iure repellat accusamus earum, minus obcaecati natus magni ducimus explicabo odit fugiat provident cumque, exercitationem eius.
        </p>
      </Panel>
    </PanelGroup>
  );
}
