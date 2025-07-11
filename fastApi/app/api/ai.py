from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import os
import openai


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

    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not set in environment")
    openai.api_key = openai_api_key

    prompt = (
        "You are an AI assistant that helps users write professional emails. "
        "Given the following write-up, generate a well-structured, clear, and polite email. "
        "Do not include any explanations, just return the email body.\n\n"
        f"Write-up: {request.writeup}\n\nEmail:"
    )
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert email writer."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=400,
            temperature=0.7,
        )
        generated_email = response.choices[0].message["content"].strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI email generation failed: {str(e)}")

    return {"content": generated_email}

@router.get("/status")
async def ai_status():
    """
    Check the status of the AI service.
    This is a placeholder function that simulates checking the AI service status.
    """
    return {"status": "AI service is running"}