from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse, HTMLResponse
from google_auth_oauthlib.flow import Flow
from google.auth.exceptions import RefreshError
import os
import requests
import secrets
import json
import logging
from typing import Dict, Optional
from fastapi.responses import RedirectResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

CLIENT_SECRETS_FILE = "credentials.json"
SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid"
]
REDIRECT_URI = "http://localhost:8000/auth/google/callback"

router = APIRouter(prefix="/auth/google", tags=["Google Auth"])

class GoogleAuthManager:
    """Enhanced Google OAuth authentication manager with better error handling"""
    
    def __init__(self):
        self.ensure_directories()
        logger.info(f"Working directory: {os.getcwd()}")
        self.validate_credentials_file()

    
    def ensure_directories(self):
        """Create necessary directories if they don't exist"""
        os.makedirs("tokens", exist_ok=True)
        os.makedirs("states", exist_ok=True)
    
    def validate_credentials_file(self):
        """Validate that credentials file exists and is properly formatted"""
        if not os.path.exists(CLIENT_SECRETS_FILE):
            raise FileNotFoundError(
                f"Google OAuth credentials file '{CLIENT_SECRETS_FILE}' not found. "
                "Please download it from Google Cloud Console."
            )
        
        try:
            with open(CLIENT_SECRETS_FILE, 'r') as f:
                creds = json.load(f)
                if 'web' not in creds and 'installed' not in creds:
                    raise ValueError("Invalid credentials file format")
        except json.JSONDecodeError:
            raise ValueError("Credentials file is not valid JSON")
    
    def create_flow(self, state: Optional[str] = None) -> Flow:
        """Create a Google OAuth flow instance with enhanced error handling"""
        try:
            return Flow.from_client_secrets_file(
                CLIENT_SECRETS_FILE,
                scopes=SCOPES,
                redirect_uri=REDIRECT_URI,
                state=state
            )
        except Exception as e:
            logger.error(f"Error creating OAuth flow: {str(e)}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to initialize OAuth flow: {str(e)}"
            )
    
    def generate_and_store_state(self) -> str:
        """Generate a secure state parameter and store it"""
        state = secrets.token_urlsafe(32)
        state_file = f"states/{state}.txt"
        
        try:
            with open(state_file, "w") as f:
                f.write(state)
            return state
        except Exception as e:
            logger.error(f"Error storing state: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to generate authentication state")
    
    def verify_and_cleanup_state(self, state: str) -> bool:
        """Verify state parameter and clean up the state file"""
        if not state:
            return False
            
        state_file = f"states/{state}.txt"
        
        try:
            if not os.path.exists(state_file):
                return False
            
            with open(state_file, "r") as f:
                stored_state = f.read().strip()
            
            # Clean up the state file
            os.remove(state_file)
            
            return stored_state == state
        except Exception as e:
            logger.error(f"Error verifying state: {str(e)}")
            return False
    
    def get_user_info(self, credentials) -> Dict[str, str]:
        """Fetch user information from Google API"""
        try:
            response = requests.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={"Authorization": f"Bearer {credentials.token}"},
                timeout=10
            )
            
            if response.status_code != 200:
                logger.error(f"Failed to fetch user info: {response.status_code} - {response.text}")
                raise HTTPException(
                    status_code=400, 
                    detail="Failed to fetch user information from Google"
                )
            
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error fetching user info: {str(e)}")
            raise HTTPException(
                status_code=500, 
                detail="Network error while fetching user information"
            )
    
    def save_credentials(self, user_email: str, credentials) -> str:
        """Save user credentials to file"""
        try:
            safe_email = user_email.replace("@", "_at_").replace(".", "_dot_")
            token_file = f"tokens/{safe_email}.json"

            credentials_dict = {
                "token": credentials.token,
                "refresh_token": credentials.refresh_token,
                "token_uri": credentials.token_uri,
                "client_id": credentials.client_id,
                "scopes": credentials.scopes
            }

            # Only add client_secret if it exists
            if getattr(credentials, "client_secret", None):
                credentials_dict["client_secret"] = credentials.client_secret

            # Log what you're saving
            logger.info(f"Saving credentials to {token_file}")
            logger.debug(json.dumps(credentials_dict, indent=2))  # For deeper debugging

            with open(token_file, "w") as f:
                json.dump(credentials_dict, f, indent=2)

            return token_file
        except Exception as e:
            logger.error(f"Error saving credentials: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to save authentication credentials")



# Initialize the auth manager
auth_manager = GoogleAuthManager()

@router.get("/")
def google_login():
    """
    Initiate Google OAuth login flow
    Returns a redirect to Google's OAuth consent page
    """
    try:
        # Create OAuth flow
        flow = auth_manager.create_flow()
        
        # Generate and store state parameter
        state = auth_manager.generate_and_store_state()
        
        # Get authorization URL with state parameter
        auth_url, _ = flow.authorization_url(
            prompt="consent",
            include_granted_scopes="true",
            state=state,
            access_type="offline"
        )
        
        logger.info(f"Redirecting to Google OAuth with state: {state}")
        return RedirectResponse(auth_url)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in google_login: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initiate Google login")

@router.get("/callback")
def google_callback(request: Request):
    """
    Handle Google OAuth callback with enhanced error handling
    """
    try:
        # Extract parameters from query
        code = request.query_params.get("code")
        state = request.query_params.get("state")
        error = request.query_params.get("error")
        error_description = request.query_params.get("error_description")
        
        # Handle OAuth errors
        if error:
            logger.error(f"OAuth error: {error} - {error_description}")
            
            # Handle specific error cases
            if error == "access_denied":
                return HTMLResponse(
                    content="""
                    <html>
                        <body>
                            <h2>Access Denied</h2>
                            <p>You denied access to the application.</p>
                            <p><a href="/auth/google/">Try again</a></p>
                        </body>
                    </html>
                    """,
                    status_code=400
                )
            elif "verification" in error_description.lower() if error_description else False:
                return HTMLResponse(
                    content="""
                    <html>
                        <body>
                            <h2>App Not Verified</h2>
                            <p>This app hasn't completed Google's verification process.</p>
                            <h3>For Developers:</h3>
                            <ul>
                                <li>Add your email to test users in Google Cloud Console</li>
                                <li>Or complete the verification process for production use</li>
                            </ul>
                            <h3>For Users:</h3>
                            <ul>
                                <li>Click "Advanced" on the warning page</li>
                                <li>Then click "Go to [App Name] (unsafe)" to proceed</li>
                            </ul>
                            <p><a href="/auth/google/">Try again</a></p>
                        </body>
                    </html>
                    """,
                    status_code=400
                )
            
            raise HTTPException(
                status_code=400, 
                detail=f"OAuth error: {error} - {error_description or 'Unknown error'}"
            )
        
        if not code:
            raise HTTPException(status_code=400, detail="Authorization code not provided")
        
        if not state:
            raise HTTPException(status_code=400, detail="State parameter not provided")
        
        # Verify state parameter
        if not auth_manager.verify_and_cleanup_state(state):
            raise HTTPException(status_code=400, detail="Invalid or expired state parameter")
        
        # Create flow with state and exchange code for token
        flow = auth_manager.create_flow(state=state)
        
        try:
            flow.fetch_token(code=code)
        except Exception as e:
            logger.error(f"Token exchange failed: {str(e)}")
            if "invalid_grant" in str(e):
                raise HTTPException(
                    status_code=400, 
                    detail="Authorization code expired or invalid. Please try again."
                )
            raise HTTPException(
                status_code=400, 
                detail=f"Failed to exchange authorization code: {str(e)}"
            )
        
        credentials = flow.credentials
        
        # Get user information
        user_info = auth_manager.get_user_info(credentials)
        user_email = user_info.get("email")
        
        if not user_email:
            raise HTTPException(status_code=400, detail="Could not retrieve email from Google")
        
        # Save credentials
        token_file = auth_manager.save_credentials(user_email, credentials)
        
        logger.info(f"Successfully authenticated user: {user_email}")

        # success_url = f"http://localhost:5173/gmail/success?email={user_email}"
        success_url = f"http://localhost:5173/ai-mail-compose"
        return RedirectResponse(url=success_url)

        
        
    except HTTPException:
        raise
    except RefreshError as e:
        logger.error(f"Token refresh error: {str(e)}")
        raise HTTPException(status_code=400, detail="Failed to refresh authentication token")
    except Exception as e:
        logger.error(f"Unexpected error in google_callback: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to complete Google authentication")

@router.get("/setup-help")
def setup_help():
    """
    Provide setup instructions for Google OAuth
    """
    return HTMLResponse(
        content="""
        <html>
            <head>
                <title>Google OAuth Setup Help</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    code { background-color: #f4f4f4; padding: 2px 4px; }
                    .error { color: #d32f2f; }
                    .success { color: #388e3c; }
                </style>
            </head>
            <body>
                <h1>Google OAuth Setup Help</h1>
                
                <h2>Common Issues</h2>
                
                <h3>1. "Access Blocked" Error</h3>
                <p class="error">This occurs when your app isn't verified by Google.</p>
                <p><strong>Solutions:</strong></p>
                <ul>
                    <li><strong>For Testing:</strong> Add test users in Google Cloud Console</li>
                    <li><strong>For Production:</strong> Complete Google's verification process</li>
                </ul>
                
                <h3>2. Adding Test Users</h3>
                <ol>
                    <li>Go to <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a></li>
                    <li>Navigate to "APIs & Services" → "OAuth consent screen"</li>
                    <li>Scroll to "Test users" section</li>
                    <li>Click "Add Users" and add email addresses</li>
                    <li>Save changes</li>
                </ol>
                
                <h3>3. Bypassing Unverified App Warning</h3>
                <p>Users can bypass the warning by:</p>
                <ol>
                    <li>Click "Advanced" on the warning page</li>
                    <li>Click "Go to [App Name] (unsafe)"</li>
                </ol>
                
                <h3>4. Required Files</h3>
                <p>Make sure you have:</p>
                <ul>
                    <li><code>credentials.json</code> - Download from Google Cloud Console</li>
                    <li>Correct redirect URI: <code>http://localhost:8000/auth/google/callback</code></li>
                </ul>
                
                <h3>5. Scopes Configuration</h3>
                <p>Ensure these scopes are configured in your OAuth consent screen:</p>
                <ul>
                    <li><code>https://www.googleapis.com/auth/gmail.send</code></li>
                    <li><code>https://www.googleapis.com/auth/userinfo.email</code></li>
                    <li><code>https://www.googleapis.com/auth/userinfo.profile</code></li>
                    <li><code>openid</code></li>
                </ul>
                
                <p><a href="/auth/google/">← Back to Login</a></p>
            </body>
        </html>
        """
    )

@router.get("/status/{user_email}")
def check_auth_status(user_email: str):
    """Check if a user has valid authentication credentials"""
    try:
        safe_email = user_email.replace("@", "_at_").replace(".", "_dot_")
        token_file = f"tokens/{safe_email}.json"
        
        if not os.path.exists(token_file):
            return {"authenticated": False, "message": "No credentials found"}
        
        with open(token_file, "r") as f:
            credentials_data = json.load(f)
        
        return {
            "authenticated": True,
            "user_email": user_email,
            "scopes": credentials_data.get("scopes", []),
            "token_file": token_file
        }
        
    except Exception as e:
        logger.error(f"Error checking auth status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to check authentication status")

@router.delete("/revoke/{user_email}")
def revoke_auth(user_email: str):
    """Revoke authentication for a user"""
    try:
        safe_email = user_email.replace("@", "_at_").replace(".", "_dot_")
        token_file = f"tokens/{safe_email}.json"
        
        if os.path.exists(token_file):
            os.remove(token_file)
            logger.info(f"Revoked authentication for user: {user_email}")
            return {"detail": f"Authentication revoked for {user_email}"}
        else:
            raise HTTPException(status_code=404, detail="No credentials found for this user")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error revoking auth: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to revoke authentication")