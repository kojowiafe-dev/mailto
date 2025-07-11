
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai
import traceback

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
    responses={404: {"description": "Not found"}},
)


# Request model for email generation
class EmailRequest(BaseModel):
    writeup: str

@router.post("/generate")
async def generate_email(request: EmailRequest):
    """
    Generate an email based on the user's write-up using OpenAI GPT.
    """
    if not request.writeup:
        raise HTTPException(status_code=400, detail="Write-up cannot be empty")

    # gemini_api_key = os.getenv("GEMINI_API_KEY")
    gemini_api_key = "AIzaSyCDUUvsREtnT40dqwinIlu5BKrl4JuSWrw"
    if not gemini_api_key:
        raise HTTPException(status_code=500, detail="Gemini API key not set in environment")
    genai.configure(api_key=gemini_api_key)

    prompt = (
        "You are an AI assistant that helps users write professional emails. "
        "Given the following write-up, generate a well-structured, clear, and polite email. "
        "Do not include any explanations, just return the email body.\n\n"
        f"Write-up: {request.writeup}\n\nEmail:"
    )
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        generated_email = response.text.strip() if hasattr(response, "text") and response.text else ""
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"AI email generation failed: {str(e)}")

    return {"content": generated_email}

@router.get("/status")
async def ai_status():
    """
    Check the status of the AI service.
    This is a placeholder function that simulates checking the AI service status.
    """
    return {"status": "AI service is running"}