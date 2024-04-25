import { cache } from '@solidjs/router';
import { parse } from 'csv-parse/sync';

export const loadFileTree = cache(async () => {
  "use server"
  const res = await fetch("https://raw.githubusercontent.com/Veikkosuhonen/git-viz/master/data/gptwrapper_file_tree.json");
  return res.json();
}, "fileTree")

export const loadAdjacency = cache(async () => {
  "use server"
  const res = await fetch("https://raw.githubusercontent.com/Veikkosuhonen/git-viz/master/data/gptwrapper_adjacency.csv");
  const adjacency = await res.text();

  return parse(adjacency, { 
    columns: true,
    skip_empty_lines: true
  });
}, "adjacency")