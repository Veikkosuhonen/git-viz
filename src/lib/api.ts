import { cache } from '@solidjs/router';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const readFile = async (url: string) => {
  "use server"
  // List files in cwd
  const r = await fs.stat(path.join(process.cwd()));
  console.log(r);

  const file = await fs.readFile(path.join(process.cwd(), url), 'utf8');
  return file
}

export const loadFileTree = cache(async () => {
  "use server"
  const fileTree = await readFile('data/gptwrapper_file_tree.json');
  return JSON.parse(fileTree);
}, "fileTree")

export const loadAdjacency = cache(async () => {
  "use server"
  const adjacency = await readFile('data/gptwrapper_adjacency.csv');
  return parse(adjacency, { 
    columns: true,
    skip_empty_lines: true
  });
}, "adjacency")