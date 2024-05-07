import { cache } from '@solidjs/router';
import { parse } from 'csv-parse/browser/esm/sync';

const baseUrl = process.env.NODE_ENV === 'development'
? 'http://localhost:3000'
: 'https://raw.githubusercontent.com/Veikkosuhonen/git-viz/master/'

const ignoredFiles = ["package-lock.json", "package.json"]

const repoName = "oodikone"

export const loadFileTree = cache(async () => {
  const res = await fetch(`${baseUrl}/public/data/${repoName}_file_tree.json`);
  return res.json();
}, "fileTree")

export const loadAdjacency = cache(async () => {
  const res = await fetch(`${baseUrl}/public/data/${repoName}_adjacency.csv`);
  const adjacency = await res.text();

  return parse(adjacency, { 
    columns: true,
    skip_empty_lines: true
  });
}, "adjacency")

export const loadChangesAndAdjacency = cache(async () => {
  const res = await fetch(`${baseUrl}/public/data/${repoName}_changes.csv`);
  const csv = await res.text();

  const changes = parse(csv, { 
    columns: true,
    skip_empty_lines: true
  });

  const adjacency: { [src: string]: { [tgt: string]: number } } = {}

  const files = []
  let hash = changes[0]["commit"]
  for (let i = 0; i < changes.length; i++) {
    if (ignoredFiles.some((f) => changes[i].file.includes(f))) {
      continue
    }
  
    const row = changes[i]
    
    if (row["commit"] !== hash) {
      const changeValue = 1 / files.length
      for (const file of files) {
        if (!adjacency[file]) {
          adjacency[file] = {}
        }
        for (const otherFile of files) {
          if (file !== otherFile) {
            if (!adjacency[file][otherFile]) {
              adjacency[file][otherFile] = 0
            }
            adjacency[file][otherFile] += changeValue
          }
        }
      }
      hash = row["commit"]
      files.length = 0
    }

    files.push(row.file)
  }

  return { changes, adjacency }
}, "changes")
