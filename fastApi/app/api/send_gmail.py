from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from email.mime.text import MIMEText
import base64

def send_gmail_email(to_email, subject, body):
    # Load stored credentials
    creds = Credentials.from_authorized_user_file("token.json", ['https://www.googleapis.com/auth/gmail.send'])
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
