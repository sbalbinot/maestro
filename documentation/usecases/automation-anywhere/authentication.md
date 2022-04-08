## Automation Anywhere Authentication

> ## Input Data:
* Access Token

> ## Primary flow
1. Get data (name, email and Automation Anywhere ID) from Control Room API
2. Check if user already exists with the email received
3. Create an account for the user
4. Create an access token, from user id, with 30 minutes expiration
5. Return generated access token

> ## Alternative flow: User already exists
3. Update user account with data received (Automation Anywhere ID and name - only updates name if user doesnt have it)

> ## Exception flow: Invalid or expired token
1. Return authentication error
