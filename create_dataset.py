import git
import os
import pandas as pd
import numpy as np

repo_name = "palaute"
repo_owner = "UniversityOfHelsinkiCS"
repo_path = f"./tmp/{repo_owner}_{repo_name}"
branch = "master"

# check if the repository exists at ./tmp/repo_name
# if it does, pull the latest changes
# if it doesn't, clone the repository
def get_repo():
    if os.path.exists(repo_path):
        # Git pull the latest changes
        repo = git.Repo(repo_path)
        repo.remotes.origin.pull()
        return repo
    else:
        # Git clone the repository into ./tmp
        url = f"https://github.com/{repo_owner}/{repo_name}"
        return git.Repo.clone_from(url, repo_path)
    
repo = get_repo()


from dataclasses import dataclass

@dataclass
class FileNode:
    name: str
    lines: int
    children: list = None

    def to_json(self):
        result = { "name": self.name }
        if self.children:
            result["children"] = [child.to_json() for child in self.children]
        else:
            result["lines"] = self.lines
        return result

# Find all files in the repository (./tmp/repo)
file_names = set()

acual_root_node = FileNode("/", 0, [])

dir_nodes = { "": acual_root_node }

prefix = f"{repo_path}/"

for root, dirs, dir_files in os.walk(repo_path):
    root_node = dir_nodes[root.removeprefix(prefix)]
    
    for file in dir_files:
        path = os.path.join(root, file)
        fname = path.removeprefix(prefix)
        
        # Count the number of lines in the file
        lines = 0
        with open(path, "r") as f:
            try:
                lines = len(f.readlines())
            except UnicodeDecodeError:
                print(f"UnicodeDecodeError: {fname}")

        fnode = FileNode(fname, lines)
        root_node.children.append(fnode)
        file_names.add(fname)
    if ".git" in dirs:
        dirs.remove(".git")
    
    for dir in dirs:
        dname = os.path.join(root, dir).removeprefix(prefix)
        dnode = FileNode(dname, 0, [])
        root_node.children.append(dnode)
        dir_nodes[dname] = dnode

# Save the file tree to JSON
import json
with open(f"{repo_path}_file_tree.json", "w") as f:
    json.dump(acual_root_node, f, indent=2, default=lambda o: o.to_json())

df = None

if os.path.exists(f"{repo_path}_changes.csv"):
    df = pd.read_csv(f"{repo_path}_changes.csv")
else:
    authors = set()
    source_files = set()
    changes = []

    for commit in repo.iter_commits(branch):
        authors.add(commit.author.name)

        for item in commit.stats.files:
            if item not in file_names:
                continue
            source_files.add(item)
            changes.append({
                'commit': commit.hexsha,
                'file': item,
                'insertions': commit.stats.files[item]['insertions'],
                'deletions': commit.stats.files[item]['deletions'],
                'author': commit.author.name,
                'date': commit.authored_datetime
            })
        
        print("#", end="")

    df = pd.DataFrame(changes)

    df.to_csv(f"{repo_path}_changes.csv", index=False)


adjacency_df = None

if os.path.exists(f"{repo_path}_adjacency.csv"):
    adjacency_df = pd.read_csv(f"{repo_path}_adjacency.csv", index_col=0)
else:
    file_idx = list(file_names)
    adjacency_df = pd.DataFrame(index=file_idx, columns=file_idx, dtype=np.int16)
    adjacency_df = adjacency_df.fillna(0)

    # Count the number of times each file is changed with each other file
    for fnames in df.groupby(df["commit"])["file"].apply(list):
        for file in fnames:
            for other_file in fnames:
                if file == other_file:
                    continue
                adjacency_df.loc[file, other_file] = adjacency_df.loc[file, other_file] + 1

    adjacency_df.to_csv(f"{repo_path}_adjacency.csv")
