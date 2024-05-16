import { useLocation } from "@solidjs/router";

export default function Nav() {
  return (
    <nav class="flex-[3%] bg-slate-200 text-amber-600 flex space-between items-center w-[100vw] border-b border-slate-300 text-sm px-4">
      <a class="font-semibold basis-1/4 p-1" href="/">Git-Viz</a>
      <div class="basis-1/2 text-center p-1">
        <a href="https://github.com/UniversityOfHelsinkiCS/oodikone" target="_blank" class=" bg-slate-200 rounded-full border border-slate-400 p-2 hover:underline">dataset: UniversityOfHelsinkiCS / oodikone</a>
      </div>
      <p class="basis-1/4 p-1 flex">
        <a class="mr-auto" href="https://github.com/Veikkosuhonen/git-viz">GitHub</a>
        <a href="https://darkreader.org/" target="_blank">need dark mode 🌙?</a>
      </p>
    </nav>
  );
}
