from pydantic import BaseModel

class Location(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float
    poster: str
    message: str
