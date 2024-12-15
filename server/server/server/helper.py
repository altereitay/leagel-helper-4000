from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def send_message(message: str = ''):
    if message == '':
        return 'empty'
    try:
        chat_completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": 'answer with short replies'},
                      {"role": "user", "content": message}]
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f'Error: {e}'
