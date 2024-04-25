import { cache } from '@solidjs/router';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const readFile = async (url: string) => {
  "use server"
  const file = await fs.readFile(path.join(process.cwd(), url), 'utf8');
  return file
}

export const loadFileTree = cache(async () => {
  "use server"
  const fileTree = await readFile('gptwrapper_file_tree.json');
  return JSON.parse(fileTree);
}, "fileTree")

export const loadAdjacency = cache(async () => {
  "use server"
  const adjacency = await readFile('gptwrapper_adjacency.csv');
  return parse(adjacency, { 
    columns: true,
    skip_empty_lines: true
  });
}, "adjacency")