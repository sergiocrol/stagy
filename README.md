# Stagy

## Description

An app to buy and sell live music.
 
## User Stories

**Setup**
- As a developer, I want to have a seeders file to quickly populate the database
- As a developer, I want to have all the files ready to be connected
- As a developer, I want to have all the initial packages and configurations ready to start developing

**404**
- As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 

**500**

- As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**layout**

- As a user I want to see a navbar with a logo and back button
- As a user I want to see a footer with notifications, requests, search and profile buttons in every view

**homepage**

- As a registered user I want to be able to access the homepage so that I see what the app is about and login or signup
- As a not registered user I want to be able to access the landing page and start searching what I want
- As a band I want to see a list of stage suggestions in the homepage
- As a stage I want to see a list of band suggestions in the homepage

**sign up**

- As a user I want to sign up to the webpage so that I can access the searching and offered functionalities
- As a user I want to specify my name, username and password, main location and what type of user I am.
- As a user I want to be able to sign up in any moment of my navigation

**login**

- As a user I want to be able to log in on the webpage so that I can get back to my account
- As a user I want to be able to log in in every moment of my navigation

**logout** 

- As a user I want to be able to log out from the webpage so that I can make sure no one will access my 
account

**profile**

- As a user I want to enter my preferences and information for my profile
- As a user I want to edit the current information in my profile
- As a band I want to be able to add several locations and dates
- As a band I want to be able to set a fee for my services
- As a user I want to see a list of available genres that I can choose from

**search**

- As a band I want to be able to search for available stages according to genre and location
- As a stage I want to be able to search for available bands by genre and location
- As a user I want to see a list of available genres that I can choose from

**search results**

- As a user I want to be able to see a list of results according to my search
- As a band I want to be able to send a wink to a stage
- As a stage I want to be able to send a hiring request to a band and choose a date for it

**notifications**

- As a user I want to be able to see a list of notifications I have reveived
- As a stage I want to be able to see a list of notifications of which bands are interested in my local
- As a stage I want to be able to see a list of notifications of requests I have send to bands
- As a stage I want to be able to cancel a request
- As band I want to be able to see a list of notifications of stages that want to hire me
- As band I want to accept/reject a request
- As a user I want to be able to see a notification to rate my experience with another user
- As a user I want to receive reviews from the other user
- As a user I want to receive reminders for the reviews I can give
- As a user I want to receive reminders to leave a review


**requests**

- As a user I want to see a list of requests that have been accepted
- As a user I want to be able to cancel a request
- As a user I can be able to see the request list ordered according to the status

## Backlog

List of other features outside of the MVPs scope

User profile:
- Upload pictures and videos
- Make the pictures bigger

Geo Location:
- See available establishments in a map 

Request
- Respond to messages
- Negociate price
- Flexible date

Messaging
- Send/receive messages
- delete conversations

Favorite list
- Add band/establishment to my list of favorites
- Delete band/establishment from my list of favorites
- A stage can be able to to see a list of bands they have send a wink

Account
- Delete account


## ROUTES:

|Method|URL|Description|
|---|--|--------|
|GET|/|renders the homepage|
|GET|/auth/signup|redirects to / if user logged in<br>renders the signup form|
|POST|/auth/signup|redirects to / if user logged in<br>body: name, email, password, location, type|
|GET|/auth/login|redirects to / if user logged in<br>renders the login form|
|POST|/auth/login|redirects to / if user logged in<br>body: email, password|
|POST|/auth/logout|delete user's session<br>redirect to /|
|GET|/users/|search in the stage/band collection according query/params <br> renders 'search results' view with the result of search|
|GET|/users/:id|search selected stage/band in the database <br> renders view with the result of search|
|POST|/users/:id|Get information of selected user and update the rating and reviewers <br> Remove (DOM)
|GET|/requests/|render popup (Axios - DOM manipulation)
|POST|/requests/|Create a request in the database <br> remove popup
|GET|/requests/notifications/|search in the requests collection according to user's id and state (pending|resolved) <br> renders a view with list of notifications
|POST|/requests/notifications/| Take info of the selected user and update request's state <br> Remove (DOM manipulation)
|GET|/requests/list/| search in the requests collection according to user's id and state (accepted|rejected|resolved) <br> renders a view with list of requests
|POST|/requests/list/ | Take info of the selected user and update request's state
|GET|/profile/ | Get information of active user <br> renders view with the result of the request
|GET|/profile/edit | render the view of profile's edition
|POST|/profile/dit | Take the edited information and update database <br> rerenders user's profile

## Models

Band model
 
- email: String
- password: password
- location: String
- genre: enum
- locations: Array
- price: Number
- rating: Number
- reviewers: Number
- description: String
- tagline: String
- profilePicture: String

Stage model

- email: String
- password: password
- location: String
- direction: String
- rating: Number
- reviewers: Number
- description: String
- tagline: String
- profilePicture: String

Request Model

- senderId: id
- receiverId: id
- message: String
- Date: Date
- state: enum (pending | accepted | rejected | canceled | resolved)
- timestamp

## Links

### Git

The url to your repository and to your deployed project

## Trello

[Board](https://trello.com/b/RmqyDJtY/stagy)

### Slides

The url to your presentation slides

[Google Slides](https://docs.google.com/presentation/d/1UKuXn8c_6EyE_YItqEFZ0McmACrQb31HWJJZZY6VMZc/)
