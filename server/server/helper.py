from openai import OpenAI
from dotenv import load_dotenv
import os
import pdfplumber
from docx import Document

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

users_contexts = {}

def initialize_user_context(user_id):
    if user_id not in users_contexts:
        users_contexts[user_id] = [
            {"role": "system", "content": "You are a legal assistant. Use the provided documents and links to answer questions."},
            {"role": "system", "content": 'answer with short replies'},
        ]


def add_to_context(user_id, role, content):
    if user_id not in users_contexts:
        initialize_user_context(user_id)
    users_contexts[user_id].append({"role": 'system', "content": 'this is context that you will provide answers from in english only ' + content})
    return 'added context'

def send_message(user_id, message: str = ''):
    add_to_context(user_id, "user", message)
    if message == '':
        return 'empty'
    try:
        chat_completion = client.chat.completions.create(
            model="chatgpt-4o-latest",
            messages=users_contexts[user_id]
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f'Error: {e}'

def process_and_send_file(file):
    temp_filename = f"temp_{file.name}"
    with open(temp_filename, 'wb') as temp_file:
        temp_file.write(file.read())

    try:
        file_extension = os.path.splitext(temp_filename)[1].lower()

        if file_extension == '.pdf':
            with pdfplumber.open(temp_filename) as pdf:
                extracted_text = ''.join(page.extract_text() for page in pdf.pages)

        elif file_extension == '.docx':
            doc = Document(temp_filename)
            extracted_text = '\n'.join(paragraph.text for paragraph in doc.paragraphs)

        else:
            raise ValueError("Unsupported file type. Only PDF and DOCX are supported.")

        return extracted_text

    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

