import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


async def analyze(content):
    prompt = f"""
    Analyze this resume and provide:
    1. Resume score out of 100
    2. Strengths
    3. Weaknesses
    4. Suggestions for improvement
    Resume Content:
    {content}
    """

    response = model.generate_content(prompt)

    return response.text