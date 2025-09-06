# Email Setup Instructions

## Setting up Gmail for your contact form

To enable email functionality for your contact form, you need to set up Gmail with an App Password:

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings (https://myaccount.google.com)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2-factor authentication if not already enabled

### Step 2: Generate App Password
1. In the same Security section, click on "App passwords"
2. Select "Mail" as the app type
3. Generate a new app password
4. Copy the 16-character password (it will look like: abcd efgh ijkl mnop)

### Step 3: Set Environment Variables
1. Copy `.env.example` to `.env`
2. Replace `your-gmail-app-password-here` with the app password you generated
3. Optionally, change the SECRET_KEY to a random string

### Step 4: Test the Setup
1. Run your Flask app: `python app.py`
2. Go to your website's contact form
3. Fill out and submit the form
4. Check your email at randeepaariyawansa324@gmail.com

### Troubleshooting
- Make sure you're using the App Password, not your regular Gmail password
- Ensure 2-factor authentication is enabled on your Google account
- Check that Flask-Mail is installed: `pip install Flask-Mail`
- If emails aren't sending, check the Flask app logs for error messages

### Security Notes
- Never commit your `.env` file to version control
- Keep your app password secure
- The app password only works for this specific application
