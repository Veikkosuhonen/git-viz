import { Visualization } from "~/components/Visualization";

export default function Home() {
  return (
    <main class="flex-grow flex w-[100vw] justify-between">
      <section class="basis-1/4 p-2 bg-slate-900 shadow-lg text-slate-200">
        <p class="h-96 p-4 bg-slate-800 rounded-md border border-slate-700">
          Controls
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam beatae ea harum numquam molestias iure repellat accusamus earum, minus obcaecati natus magni ducimus explicabo odit fugiat provident cumque, exercitationem eius.
        </p>
      </section>
      <section class="basis-1/2 p-2">
        <Visualization />
      </section>
      <section class="basis-1/4 p-2 bg-slate-900 shadow-lg text-slate-200">
        <p class="h-96 p-4 bg-slate-800 rounded-md border border-slate-700">
          Details
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam beatae ea harum numquam molestias iure repellat accusamus earum, minus obcaecati natus magni ducimus explicabo odit fugiat provident cumque, exercitationem eius.
        </p>
      </section>
    </main>
  );
}
