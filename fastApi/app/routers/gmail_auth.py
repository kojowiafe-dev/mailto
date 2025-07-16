from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import os

# Define scopes
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

# Path to credentials.json downloaded from Google Cloud
CLIENT_SECRETS_FILE = 'credentials.json'

def get_authorization_url():
    if not os.path.exists("credentials.json"):
        raise FileNotFoundError("credentials.json file not found. Please place your Google OAuth credentials here.")

    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri='http://localhost:8000/auth/google/callback'
    )
    auth_url, _ = flow.authorization_url(prompt='consent')
    return auth_url, flow

def fetch_token(flow, code):
    flow.fetch_token(code=code)
    credentials = flow.credentials
    return credentials
