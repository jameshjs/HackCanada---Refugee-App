import openai
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Load environment variables
load_dotenv()

# Replace the hardcoded API key with environment variable
openai.api_key = "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"
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}

@app.get("/input")
def read_chat():
    return {"message": "GET request received"}

@app.post("/input")
async def chat(message: ChatMessage):
    # For now, just echo back the received message
    response = chat_with_gpt(message.message)
    return {"message": f"{response}"}

conversation_history = [
        {
            "role": "system",
            "content": """You are a knowledgeable immigration consultant specializing in Canadian immigration. 
            You provide accurate information about immigration processes, visa types, requirements, and procedures for moving to Canada. 
            You should be helpful and professional while making it clear that you're providing information only and not legal advice. 
            If unsure about specific details, acknowledge the limitations and suggest consulting official sources or licensed immigration professionals."""
        }
    ]

def chat_with_gpt(user_input):
        
    # Add user message to conversation history
    conversation_history.append({"role": "user", "content": user_input})
    
    try:
        # Get response from OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation_history
        )
        
        # Extract and print the assistant's response
        assistant_response = response.choices[0].message['content']
        
        # Add assistant's response to conversation history
        conversation_history.append({"role": "assistant", "content": assistant_response})

        return assistant_response
        
    except Exception as e:
        return f"An error occurred{str(e)}"


# @app.post('/chats')
# async def create_new_chat(rdb = Depends(get_rdb)):
#     chat_id = str(uuid4())[:8]
#     created = int(time())
#     await create_chat(rdb, chat_id, created)
#     return {'id': chat_id}

# @app.post('/chats/{chat_id}')
# async def chat(chat_id: str, chat_in: ChatMessage):
#     sse_stream = assistant.run(message=chat_in.message)
#     return EventSourceResponse(sse_stream, background=rdb.aclose)




# @app.get("/")
# def read_root():
#     return {"message": "FastAPI backend is running!"}

# @app.post("/chat")
# async def chat(message: ChatMessage):
#     return {"message": "Post"}

# @app.get("/chat")
# async def chat(message: ChatMessage):
#     return {"message": "Get"}
    # try:
    #     # Initialize conversation history with a system message
    #     conversation_history = [
    #         {
    #             "role": "system",
    #             "content": """You are a knowledgeable immigration consultant specializing in Canadian immigration. 
    #             You provide accurate information about immigration processes, visa types, requirements, and procedures for moving to Canada. 
    #             You should be helpful and professional while making it clear that you're providing information only and not legal advice. 
    #             If unsure about specific details, acknowledge the limitations and suggest consulting official sources or licensed immigration professionals."""
    #         },
    #         {"role": "user", "content": message.message}
    #     ]
        
    #     # Get response from OpenAI API
    #     response = openai.ChatCompletion.create(
    #         model="gpt-3.5-turbo",
    #         messages=conversation_history
    #     )
        
    #     # Extract the assistant's response
    #     assistant_response = response.choices[0].message['content']
    #     return {"response": assistant_response}
        
    # except Exception as e:
    #     print(f"Error: {str(e)}")
    #     return {"error": str(e)}, 500

# def chat_with_gpt():
#     # Initialize conversation history with a system message
#     conversation_history = [
#         {
#             "role": "system",
#             "content": """You are a knowledgeable immigration consultant specializing in Canadian immigration. 
#             You provide accurate information about immigration processes, visa types, requirements, and procedures for moving to Canada. 
#             You should be helpful and professional while making it clear that you're providing information only and not legal advice. 
#             If unsure about specific details, acknowledge the limitations and suggest consulting official sources or licensed immigration professionals."""
#         }
#     ]
    
#     print("Immigration Consultant: Hello! I'm your AI immigration consultant for Canada. I can provide information about Canadian immigration processes and requirements. Type 'quit' to exit.")
    
#     while True:
#         # Get user input
#         user_input = input("You: ")
        
#         # Check if user wants to quit
#         if user_input.lower() == 'quit':
#             print("Immigration Consultant: Goodbye! Good luck with your immigration journey!")
#             break
        
#         # Add user message to conversation history
#         conversation_history.append({"role": "user", "content": user_input})
        
#         try:
#             # Get response from OpenAI API
#             response = openai.ChatCompletion.create(
#                 model="gpt-3.5-turbo",
#                 messages=conversation_history
#             )
            
#             # Extract and print the assistant's response
#             assistant_response = response.choices[0].message['content']
#             print("Immigration Consultant:", assistant_response)
            
#             # Add assistant's response to conversation history
#             conversation_history.append({"role": "assistant", "content": assistant_response})
            
#         except Exception as e:
#             print("An error occurred:", str(e))
#             break
