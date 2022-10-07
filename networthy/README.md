NetWorthy Backend API Guide :- 

There are 2 types of APIs.
	1. Without JWT token. For functionalities like Sign-Up, Verify Email, Login, Change Password.
	2. With JWT tokem. For all other APIs, the request will not work without a valid JWT token for security reasons.

API List :- 

1. Sign Up (POST)
	URL :- http://localhost:8080/api/auth/signup
	Request Body :- 
				{
					"username" : "amolghar",
					"email" : "amolghar@buffalo.edu",
					"password" : "password",
					"roles" :["ROLE_CLIENT"]
				}
	Response :- 
				{
					"message": "User registered successfully!"
				}
2. Verify Email (GET):- 
	URL :- http://localhost:8080/api/auth/verify/amolghar
	Response :- 
				{
					"message": "User verification successfully!"
				}
3. Sign In (POST) :- 
	URL :- http://localhost:8080/api/auth/signin
	Request Body :- 
				{
					"username" : "amolghar",
					"password" : "password"
				}
	Response :- 
				{
					"id": "633f66992282f02bf6ede393",
					"username": "amolghar",
					"email": "amolghar@buffalo.edu",
					"roles": [
						"ROLE_CLIENT"
					],
					"clientProfile": null,
					"accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbW9sZ2hhciIsImlhdCI6MTY2NTA5OTU5MywiZXhwIjoxNjY1MTg1OTkzfQ.0E34KeE1h3cd7pmh2CbTN8MyvSGATv51ARchBsgGQcxwE8tkxcqpD4p0qxVCiiHGPmw1Ta9Ipwldby1DQLESsw",
					"tokenType": "Bearer"
				}
Note :- All APIs After this will need a valid JWT token to be passed in the header.
		"header": [
					{
						"key": "Authorization",
						"value": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ2hhcnB1ciIsImlhdCI6MTY2MzczMjQ3NiwiZXhwIjoxNjYzODE4ODc2fQ.q6nF0vIYP5zwAMPlG5yo972ZMvSs9a-n0mGktAjeE7wrNsq8A8ssPhUiGB4BkCz1tBFh-BezQQVyUJyRVhV9tQ",
						"type": "text"
					}
				]
4. Change password (POST) :- 
	URL :- http://localhost:8080/api/user/changePassword
	Request Body :- 
				{
					"username" : "amolghar",
					"oldPassword" : "password",
					"newPassword" : "password123"
				}
	Response :- 
				{
					"message": "Password Updated Successfully"
				}

5. Add Client Profile (POST) :- 
	URL :- http://localhost:8080/api/client/add/clientProfile
	Request Body :- 
				{
					"username" : "amolghar",
					"emailId" : "amolghar@buffalo.edu",
					"firstName" : "Amol",
					"lastName": "Gharpure",
					"dateOfBirth" : "23-11-1995",
					"gender" : "Male",
					"occupation" : "Student",
					"education" : "Masters",
					"university" : "University at Buffalo",
					"location" : "Buffalo, NY",
					"financialLevel" : 8,
					"learningMethod" : "Virtual",
					"income" : 500,
					"debt" : 200,
					"general" : "Place Holder For Extra Comments by the client",
					"profileStatus" : true
				}
	Response :- 
				{
					"message": "Client Profile Updated Successfully"
				}