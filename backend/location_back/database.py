from pymongo import MongoClient

MONGO_URI = "mongodb+srv://cl:cl@cluster0.wtn3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["emergency_resources"]  # Database
collection = db["locations"]  # Collection