# Binder

Hackathon winning project at Elevation Academy. 
A dating app that is based on short distance. Meet new people at your checked in place and interact with them.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Installation:

Clone down this repository. 

Navigate to the folder and run:  

`npm install`  

You will need to run the client and the server separately.  
To do so, open two separated terminal screens. 

In the first terminal, run `npm start`  

To Visit the App client:

`localhost:3000/`  

Open the site in another incognito page.

RECOMENDED: View the screen in moblie display.
To do so, press `cntrl + shift + J`, and then `cntrl + shift + M`

In the second terminal, run `node server`  
The server will run locally on:
`localhost:8080/`  


To login use the following users:

`
Email: rafiperetz@gmail.com
Password: 123456
`

`
Email: miriregev@gmail.com
Password: 123456
`

In case you cloned from "localhost-version" branch, the first screen will load all the bars around Allenby 113, Tel Aviv.
Otherwise, it will display all the bars around your location.

Check in with the logged in users to the same place, and interact with eachother.

## Reflection

This is a Hackathon winning project, being part of an intensive 3-month coding Bootcamp which covered the entire MERN stack and beyond.

The purpose of the project is to provide individuals the courage to approach other people. It is a dating app based on short distances.
These days, there are many apps that let you connect with other people for different purposes. 
As a result, they end up hiding behind the keyboard, and no longer have the courage to reach them in person.


Imagine being at a bar and noticing someone to your like. If you only had some basic information about that person you could have known whether there is a point of approaching them, or not. 
With Binder, you check in to your current location, and get the list of people inside who are looking for meetings as well. 
Each person, is provided with some basic information about them, like what they are into, what are their preferences, etc. 
As the app encourages face to face interaction, and not hiding behind the screen, communication is possible through sending emojis to each other to show first interest.


Technologies used to develop this project are: React, MobX, Material UI, Node, Express, MongoDB, Mongoose, NPM packages. 
We used Socket.io to let users communicate with each other. For map display, and fetch places around the user we used the Google Maps, Google Places and Google Photos APIs.

