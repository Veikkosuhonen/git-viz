import { createResource, type Component, Show, createEffect, createSignal } from 'solid-js';
import { Visualization } from './Visualization';

const API_URL = 'http://localhost:8080'

const App: Component = () => {
  //const [response] = createResource<{ Hello: string }>(() => fetch(`${API_URL}`, {  }).then((res) => res.json()))
  //const [repo, setRepo] = createSignal<string>('')
//
  //const submitRepo = async () => {
  //  const res = await fetch(`${API_URL}/repos?url=${repo()}`, {
  //    method: 'POST',
  //  })
  //
  //  console.log(await res.json())
  //}

  return (
    <main>
      {/* <p>
        <Show when={!response.loading} fallback="loading...">
          Hello, {response()?.Hello}!
        </Show>
        <input type="text" value={repo()} onInput={(e) => setRepo(e.currentTarget.value)} />
        <button onClick={submitRepo}>Submit</button>
      </p> */}
      <Visualization />
    </main>
  );
};

export default App;
