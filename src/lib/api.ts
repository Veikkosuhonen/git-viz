import { cache } from '@solidjs/router';
import { parse } from 'csv-parse/sync';

const baseUrl = process.env.NODE_ENV === 'development'
? 'http://localhost:3000'
: 'https://raw.githubusercontent.com/Veikkosuhonen/git-viz/master/'

export const loadFileTree = cache(async () => {
  "use server"
  const res = await fetch(`${baseUrl}/public/data/palaute_file_tree.json`);
  return res.json();
}, "fileTree")

export const loadAdjacency = cache(async () => {
  "use server"
  const res = await fetch(`${baseUrl}/public/data/palaute_adjacency.csv`);
  const adjacency = await res.text();

  return parse(adjacency, { 
    columns: true,
    skip_empty_lines: true
  });
}, "adjacency")

export const loadChanges = cache(async () => {
  "use server"
  const res = await fetch(`${baseUrl}/public/data/palaute_changes.csv`);
  const changes = await res.text();

  return parse(changes, { 
    columns: true,
    skip_empty_lines: true
  });
}, "changes")
