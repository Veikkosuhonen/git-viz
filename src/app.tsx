import "solid-resizable-panels/styles.css";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";

export default function App() {
  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL}
      root={props => (
        <div class="flex flex-col h-[100vh]">
          <Nav />
          <Suspense>{props.children}</Suspense>
          <footer class="flex-[2%] bg-slate-200 text-amber-600 text-center p-2 border-t border-slate-300">
            <p>© 2024 Veikko Suhonen</p>
          </footer>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
