from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import git
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://veikkosuhonen.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.post("/repos")
async def clone_repo(url: str):
    # Make sure data folder exists
    if not os.path.exists('data'):
        os.makedirs('data')
    
    # Clone the repo
    repo_name = url.split('/')[-1]
    repo = git.Repo.clone_from(url, f"data/{repo_name}")

    return {"repo": repo_name, "head": repo.head.commit.hexsha }