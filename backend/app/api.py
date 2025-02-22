from fastapi import FastAPI
from .routers.document import router as document_router

app = FastAPI()

app.include_router(document_router)

@app.get("/")
def root():
  return "hiya! 👋 this is the root"