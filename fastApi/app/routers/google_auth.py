from fastapi import APIRouter, Request, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from google_auth_oauthlib.flow import Flow
import os

CLIENT_SECRETS_FILE = "credentials.json"
SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "openid",
    "email",
    "profile"
]

REDIRECT_URI = "http://localhost:8000/auth/google/callback"


router = APIRouter(prefix="/auth/google", tags=["Google Auth"])

import pickle
from .gmail_auth import get_authorization_url
@router.get("/")
def google_login():
    auth_url, flow = get_authorization_url()

    # Save flow as JSON instead of pickle
    with open("flow.json", "w") as f:
        f.write(flow.to_json())

    return RedirectResponse(auth_url)



import requests

def get_user_email(credentials):
    """Uses access_token to get email from Google's userinfo endpoint."""
    response = requests.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        headers={"Authorization": f"Bearer {credentials.token}"}
    )
    if response.status_code != 200:
        raise Exception("Failed to fetch user info")

    userinfo = response.json()
    return userinfo.get("email")



@router.get("/callback")
def google_callback(request: Request):
    code = request.query_params["code"]

    with open("state.txt", "r") as f:
        state = f.read()

    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI,
        state=state
    )
    flow.fetch_token(code=code)
    credentials = flow.credentials

    # ✅ Get email via userinfo endpoint
    user_email = get_user_email(credentials)
    if not user_email:
        raise HTTPException(status_code=400, detail="Could not retrieve email from Google")

    # ✅ Save token
    os.makedirs("tokens", exist_ok=True)
    with open(f"tokens/{user_email.replace('@', '_at_')}.json", "w") as token_file:
        token_file.write(credentials.to_json())

    return {"detail": f"Gmail connected for {user_email}"}

