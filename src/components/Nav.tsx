import { useLocation } from "@solidjs/router";

export default function Nav() {
  return (
    <nav class="flex-[5%] bg-slate-200 text-amber-600 flex space-between items-center w-[100vw] border-b border-slate-300">
      <a class="font-semibold basis-1/4 p-2" href="/">Git-Viz</a>
      <div class="basis-1/2 text-center p-2">
        <a href="https://github.com/UniversityOfHelsinkiCS/oodikone" target="_blank" class=" bg-slate-200 rounded-full border border-slate-400 p-3 hover:underline">dataset: UniversityOfHelsinkiCS / oodikone</a>
      </div>
      <p class="basis-1/4 p-2">
        <a href="https://github.com/Veikkosuhonen/git-viz">GitHub</a>
      </p>
    </nav>
  );
}
