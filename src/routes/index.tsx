import { Panel, PanelGroup, ResizeHandle } from "solid-resizable-panels";
import Details from "~/components/Details";
import FileList from "~/components/FileList";
import Team from "~/components/Team";
import { Visualization } from "~/components/Visualization";

export default function Home() {
  return (
    <PanelGroup direction="row" class="flex-[80%] flex w-[100vw] justify-between">
      <Panel id="left" class="basis-1/4 bg-slate-200 shadow-lg text-slate-700 flex flex-col">
        <FileList />
      </Panel>
      <ResizeHandle />
      <Panel id="center" class="basis-1/2 p-2 flex flex-col" initialSize={50}>
        <Visualization />
      </Panel>
      <ResizeHandle />
      <Panel id="right" class="basis-1/4 bg-slate-200 shadow-lg text-slate-700">
        <Details />
      </Panel>
    </PanelGroup>
  );
}
