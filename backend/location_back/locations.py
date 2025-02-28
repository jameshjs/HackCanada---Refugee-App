from fastapi import APIRouter, HTTPException
from models import Location
from database import collection
from bson import ObjectId

router = APIRouter()

@router.post("/locations")
async def create_location(location: Location):
    new_location = location.dict()
    try:
        # Insert into MongoDB collection
        result = collection.insert_one(new_location)
        return {"id": str(result.inserted_id), "message": "Location created successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/locations")
async def get_all_locations():
    try:
        locations = collection.find()
        return [{"id": str(loc["_id"]), "name": loc["name"], "address": loc["address"], "latitude": loc["latitude"], "longitude": loc["longitude"], "poster": loc["poster"], "message": loc["message"]} for loc in locations]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/locations/{location_id}")
async def get_location(location_id: str):
    try:
        # Convert the location_id string to ObjectId
        location_object_id = ObjectId(location_id)
        
        # Fetch the location from the database by ObjectId
        location = collection.find_one({"_id": location_object_id})
        
        if not location:
            raise HTTPException(status_code=404, detail="Location not found")
        
        return {"id": str(location["_id"]), "name": location["name"], "address": location["address"], 
                "latitude": location["latitude"], "longitude": location["longitude"], 
                "poster": location["poster"], "message": location["message"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/locations")
async def delete_all_locations():
    try:
        result = collection.delete_many({})  # Deletes all documents in the collection
        if result.deleted_count == 0:
            return {"message": "No locations found to delete."}
        return {"message": f"Deleted {result.deleted_count} locations successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/locations/{location_id}")
async def delete_location(location_id: str):
    try:
        # Convert location_id to ObjectId
        location_object_id = ObjectId(location_id)
        
        # Attempt to delete the location by its ObjectId
        result = collection.delete_one({"_id": location_object_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Location not found")
        
        return {"message": f"Location with ID {location_id} deleted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/locations/{location_id}")
async def update_location(location_id: str, location: Location):
    try:
        # Convert location_id to ObjectId
        location_object_id = ObjectId(location_id)
        
        # Find the existing location
        existing_location = collection.find_one({"_id": location_object_id})
        
        if not existing_location:
            raise HTTPException(status_code=404, detail="Location not found")
        
        # Prepare the update data (exclude unset fields)
        updated_location = location.dict(exclude_unset=True)
        
        # Update the location in MongoDB
        result = collection.update_one({"_id": location_object_id}, {"$set": updated_location})
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Location not found")
        
        return {"id": location_id, "message": "Location updated successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
