import time
import os
from PIL import Image
from typing import Annotated

import re

from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pdf2image import convert_from_path
import pytesseract

from pypdf import PdfReader, PdfWriter
from pypdf.constants import AnnotationDictionaryAttributes
import json

from pydantic import BaseModel
import google.generativeai as genai

genai.configure(api_key="AIzaSyDP9MMXOqUzXwbH1oTAa7pDlnPORei8GJg")

# generation_config = {
#   "temperature": 1,
#   "top_p": 0.95,
#   "top_k": 40,
#   "max_output_tokens": 8192,
#   "response_mime_type": "text/plain",
# }

# model = genai.GenerativeModel(
#   model_name="gemini-1.5-flash-8b",
#   generation_config=generation_config,
# )

# genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model
generation_config = {
  "temperature": 0.7,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 65536,
  "response_mime_type": "text/plain",
}


pdf_parse_prompt = open("prompts/parse.txt", "r", encoding='utf-8')
question_prompt = open("prompts/question.txt", "r", encoding='utf-8')

model_pdf_parse = genai.GenerativeModel(
  model_name="gemini-2.0-flash-thinking-exp-01-21",
  generation_config=generation_config,
  system_instruction=pdf_parse_prompt.read(),
  
)

model_question = genai.GenerativeModel(
  model_name="gemini-2.0-flash-thinking-exp-01-21",
  generation_config=generation_config,
  system_instruction=question_prompt.read(),
)

pdf_parse_session = model_pdf_parse.start_chat(
  history=[
  ]
)

question_session = model_question.start_chat(
    history=[
    ]
)

pdf_parse_prompt.close()
question_prompt.close()

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

router = APIRouter(
    prefix="/document",
    tags=["document"],
    responses={404: {"description": "Not found"}},
)

class ValidateRequest(BaseModel):
    user_input: str
    upload_id: int
    question_id: int


class QuestionRequest(BaseModel):
    user_input: str
    question: str
    upload_id: int
    question_id: int

def clean_unicode(input_str):
    print(input_str)

    def replace_invalid(match):
        hex_value = match.group(1)
        
        # If the Unicode sequence has fewer than 4 characters, remove it
        if len(hex_value) < 4:
            return ''
        
        # Convert hex to a character
        char = chr(int(hex_value, 16))
        
        # If the character is non-printable or invalid, remove the sequence
        if not char.isprintable():
            return ''
        
        # Otherwise, return the match unchanged
        return match.group(0)

    # Replace sequences starting with \u and followed by 1 to 4 hex digits
    cleaned_input = re.sub(r'\\u([a-fA-F0-9]{1,4})', replace_invalid, input_str)

    print(cleaned_input)
    return cleaned_input


@router.post("/validate")
def validate(request: ValidateRequest):
    upload_id = request.upload_id
    user_input = request.user_input
    question_id = request.question_id

    properties = {"language": "English en"}
    with open(f"uploads/doc-{upload_id}/properties.json", "r", encoding='utf-8') as f:
        properties = json.loads(f.read())

    question_list = []

    with open(f"uploads/doc-{upload_id}/questions.json", "r", encoding='utf-8') as f:
        question_list = json.loads(f.read())

    question = question_list["items"][question_id]

    prompt = {
        "type": "validate",
        "context": (question["description"] or "") + " " + (question["context"] or ""),
        "description": question["title"],
        "input": user_input,
        
        "language": properties["language"]
    }

    
    return json.loads(ask_ai(prompt))

@router.post("/ask")
def ask(request: QuestionRequest):
    upload_id = request.upload_id
    user_input = request.user_input
    ask_question = request.question
    question_id = request.question_id

    properties = {"language": "English en"}
    with open(f"uploads/doc-{upload_id}/properties.json", "r", encoding='utf-8') as f:
        properties = json.loads(f.read())

    question_list = []

    with open(f"uploads/doc-{upload_id}/questions.json", "r", encoding='utf-8') as f:
        question_list = json.loads(f.read())

    question = question_list["items"][question_id]

    prompt = {
        "type": "question",
        "context": (question["description"] or "") + " " + (question["context"] or ""),
        "description": question["title"],
        "question": ask_question,
        "input": user_input,
        "language": properties["language"]
    }

    return json.loads(ask_ai(prompt))


@router.get("/document/{upload_id}/{question_id}")
def question(upload_id, question_id):
    question_list = []

    with open(f"uploads/doc-{upload_id}/questions.json", "r", encoding='utf-8') as f:
        question_list = json.loads(f.read())

    return json.dumps(question_list["items"][int(question_id)])


def ask_ai(prompt):
    
    print("ask ai: ", json.dumps(prompt))

    response = question_session.send_message(json.dumps(prompt))
    text = response.text

    return text[text.find("\n") : text.rfind("\n")]
  



@router.post("/upload")
def upload(file: UploadFile = File(...), language: Annotated[str, Form()] = "English en"):
    upload_id = round(time.time() * 1000)

    newpath = f'uploads/doc-{upload_id}' 
    if not os.path.exists(newpath):
        os.makedirs(newpath)

    try:
        with open(f"uploads/doc-{upload_id}/properties.json", "w", encoding='utf-8') as f:
            f.write(json.dumps({
                "language": language
            }))

        with open(f"uploads/doc-{upload_id}/document.pdf", 'wb') as f:
            while contents := file.file.read(1024 * 1024):
                f.write(contents)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail='Something went wrong')
    finally:
        file.file.close()

    items = process_document(upload_id, language)

    # upload_id = 1740284238579
    # question_list = []

    # with open(f"uploads/questions-{upload_id}.json", "r") as f:
    #     question_list = json.loads(f.read())

    # items = question_list["items"]

    return {"message": f"Successfully uploaded {file.filename}", "id": str(upload_id), "items": items}

def process_document(upload_id, language):
    json_content = pdf_form(upload_id)
    question_list = generate_list(upload_id, json_content, language)

    with open(f"uploads/doc-{upload_id}/questions.json", "w", encoding='utf-8') as f:
        f.write(json.dumps(question_list))

    return question_list["items"]

def pdf_form(upload_id):
    
    reader = PdfReader(f"uploads/doc-{upload_id}/document.pdf")
    
    pdf_pages = []

    for page in reader.pages:
        data = {
            "text": page.extract_text(),
            "fields": []
        }

        if page.annotations:
            for annot in page.annotations:
                annot = annot.get_object()
                if(annot.get("/FT")):
                  data["fields"].append({
                      "/TU": annot.get("/TU"),
                      "/FT": annot.get("/FT")
                  })

        pdf_pages.append(data)

    return pdf_pages



def pdf_ocr(upload_id):     
    images = convert_from_path(f"uploads/doc-{upload_id}/document.pdf", poppler_path = r"C:/Program Files/poppler-24.08.0/Library/bin")

    result = ""

    for image in images:
        result += pytesseract.image_to_string(image)

    return result

def generate_list(upload_id, json_content, language):
    # SEND TO AI!!
    text = ""

    # with open("testing-documents/test-response.json", "r") as f:
    #     text = f.read()

    # return json.loads(text)

    output = {
        "items": []
    }

    for page in json_content:

      print("NEXT PAGE")

      attempts = 3

      while attempts > 0:
          print("ATTEMPTS LEFT", attempts)

          attempts -= 1

          try:
              
            response = pdf_parse_session.send_message(json.dumps({"language": language, "items": page}))

            text = clean_unicode(response.text)

            print(text)

            with open("tmp.txt", "w", encoding='utf-8') as f:
                f.write(text[text.find("\n") : text.rfind("\n")])

            output["items"].extend(json.loads(text[text.find("\n") : text.rfind("\n")])["items"])

            print("output length", len(output["items"]))

            break
          except Exception:
              print("try generating again")
              continue
        
    if attempts == 0:
        print("tried 3 times :(")
        output["items"].append({
            "type": "break",
            "title": ":(",
            "description": "an unknown error occurred"
        })
        
    
    return output


# def png_ocr(image_path):
#     return pytesseract.image_to_string(Image.open(image_path))


@router.get("/")
async def read_items():
  return "yo! 😎 this is the document root"