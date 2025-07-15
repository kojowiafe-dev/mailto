from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from gmail_auth import get_authorization_url, fetch_token
import pickle, os

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

    # Save user's credentials to DB or file (for now, file)
    with open("token.json", "w") as token_file:
        token_file.write(credentials.to_json())

    return {"detail": "Google account linked successfully"}
