# Stagy

## Description

An app to buy and sell live music.
 
## User Stories

### Bands and artists

**404**
- As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 

**500**

- As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**homepage**

- As a user I want to be able to access the homepage so that I see what the app is about and login or signup

**sign up**

- As a user I want to sign up on the webpage so that I can access the searching and offering functionalities
- As a user I want to specify what type of user I am. Weather I am a band or artist who offers music or a bar/stablishment with a stage for people to play in.


**login**
- As a user I want to be able to log in on the webpage so that I can get back to my account

**logout** 

- As a user I want to be able to log out from the webpage so that I can make sure no one will access my 
account

**profile**

- As a user I want to enter my preferences and information for my profile
- As a user I want to edit the current information in my profile
- As a establishment/independent I want to be able to differenciate if I am a physical location or a user without one
- As a band/establishment I want to be able to add several locations
- As a user I want to see a list of available genres that I can choose from

**search**
- As a band/artis I want to be able to search for available establishments according to my preferences
- As a band/artist I want to see search results related to my profile information (location, genre)
- As a establishment/independent I want to be able to search for available bands by genre and optional location
- As a establishment/independent I want to specify a genre and date for my search
- As a user I want to see a list of available genres that I can choose from

**request**
- As a establishment/independent I want to send a request to a band/artist for a certain date
- As a band/artist I want to show my interest in a establishment
- As a band/artist I want to be able to respond to a request (approve/reject)
- As a user I want to send a message to the other type of users


## Backlog

List of other features outside of the MVPs scope

User profile:
- Upload pictures and videos

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
|GET|/users/|search in the bar/band collection according query/params <br> renders 'search results' view with the result of search|
|GET|/users/:id|search selected bar/band in the database <br> renders view with the result of search|
|POST|/users/:id|Get information of selected user and update the rating and reviewers <br> Remove (DOM)
|GET|/requests/|render popup (Axios - DOM manipulation)
|POST|/requests/|Create a request in the database <br> remove popup
|GET|/requests/notifications/|search in the requests collection according to user's id and state (pending|resolved) <br> renders a view with list of notifications
|POST|/requests/notifications/| Take info of the selected user and update request's state <br> Remove (DOM manipulation)
|GET|/requests/list/| search in the requests collection according to user's id and state (accepted|rejected|resolved) <br> renders a view with list of requests
|POST|/requests/list/ | Take info of the selected user and update request's state
|GET|/users/profile/ | Get information of active user <br> renders view with the result of the request
|POST|/users/profile/ | Take the information of active user <br> update user's information in the data base <br> rerenders user's profile


## Models

Band model
 
email: String
password: password
location: location
genre: enum
locations: Array
price: Number
rating: Number
reviewers: Number
Description: String
tagline: String
profilePicture: String


Bar model

email: String
password: password
location: location
rating: Number
reviewers: Number
Description: String
tagline: String
profilePicture: String

Request Model

senderId: id
receiverId: id
message: String
Date: Date
state: enum pending|accepted|rejected|canceled|resolved
timestamp

## Links

### Git

The url to your repository and to your deployed project

### Slides

The url to your presentation slides

[Google Slides](https://docs.google.com/presentation/d/1UKuXn8c_6EyE_YItqEFZ0McmACrQb31HWJJZZY6VMZc/)

## Kanban

img

