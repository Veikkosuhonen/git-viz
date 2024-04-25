import { useLocation } from "@solidjs/router";

export default function Nav() {
  return (
    <nav class="bg-slate-900 text-amber-300">
      <ul class="container flex items-center p-2">

        <li class="mx-1.5 sm:mx-6 font-semibold">
          <a href="/">Git-Viz</a>
        </li>
        <li class="mx-1.5 sm:mx-6">
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}
