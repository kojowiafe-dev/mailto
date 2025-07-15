from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from .gmail_auth import get_authorization_url, fetch_token
import pickle, os
import models
from oauth2 import get_current_user

router = APIRouter(prefix="/auth/google", tags=["Google Auth"])

@router.get("/")
def google_login():
    auth_url, flow = get_authorization_url()
    # Save flow state temporarily
    with open("flow.pkl", "wb") as f:
        pickle.dump(flow, f)
    return RedirectResponse(auth_url)

@router.get("/callback")
def google_callback(request: Request):
    code = request.query_params["code"]
    with open("flow.pkl", "rb") as f:
        flow = pickle.load(f)

    credentials = fetch_token(flow, code)

    # Get user's email from token
    user_email = credentials.id_token.get("email")  # Get from ID token
    if not user_email:
        return {"error": "Unable to extract user email from Google credentials"}

    # Save per-user token file
    os.makedirs("tokens", exist_ok=True)
    token_path = f"tokens/{user_email.replace('@', '_at_')}.json"
    with open(token_path, "w") as token_file:
        token_file.write(credentials.to_json())

    # Redirect to frontend success page
    return RedirectResponse("http://localhost:5173/google-linked-success")


@router.get("/email/status")
def gmail_status(current_user: models.User = Depends(get_current_user)):
    token_path = f"tokens/{current_user.email.replace('@', '_at_')}.json"
    return {"gmail_linked": os.path.exists(token_path)}
