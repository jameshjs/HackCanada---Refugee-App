from fastapi import APIRouter

router = APIRouter(
    prefix="/document",
    tags=["document"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def read_items():
  return "yo! 😎 this is the document root"