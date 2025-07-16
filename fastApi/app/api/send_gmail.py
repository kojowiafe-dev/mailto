from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from email.mime.text import MIMEText
import base64
import os

def send_gmail_email(to_email, subject, body, user_email):
    # 🔥 Fix: use user_email not undefined user
    safe_email = user_email.replace("@", "_at_").replace(".", "_dot_")
    token_path = f"tokens/{safe_email}.json"

    # Check if token file exists
    if not os.path.exists(token_path):
        raise Exception(f"No Gmail token found for {user_email}. User must authenticate via Google first.")

    creds = Credentials.from_authorized_user_file(token_path, ['https://www.googleapis.com/auth/gmail.send'])
    service = build('gmail', 'v1', credentials=creds)

    # Build MIME message
    message = MIMEText(body)
    message['to'] = to_email
    message['subject'] = subject
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    # Send email
    send_result = service.users().messages().send(
        userId="me",
        body={'raw': raw_message}
    ).execute()

    return send_result
