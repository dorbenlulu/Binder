const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api.js");
const errorHandler = require('./server/middlewares/errorHandler/errorHandler')
const config = require('./config/config')
// const dbSetup = require('./server/db/dbSetup')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require("axios")
const apiKey = process.env.GOOGLE_MAP_API_KEY //move through config
const controller = require('./server/middlewares/controllers/controller')
const queries = require('./server/db/queries')
const userIds = require('./dummyData').userIds
const PORT = 8080



const users = []
const locations = {}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.use("/", api);
app.use(errorHandler)

io.on('connection', function (socket) {
    console.log('user has connected')
    let socketUser = {}

    socket.on('userId', (user) => {
        user.socketId = socket.id
        socketUser = user
        console.log('user has logged in: ',user.firstName)
        socket.emit(`socketId`, socket.id);
    })
    
    socket.on('GPSlocation', async (GPSlocation) => {

        const nearLocations = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${GPSlocation.lat},${GPSlocation.lng}&radius=100&type=bar&key=${apiKey}`);
        let places = nearLocations.data.results.map(itemName => ({ name: itemName.name, id: itemName.place_id, locationCoordinates: itemName.geometry.location }))
        let pictures=[]

        try{
            for(let i=0 ; i<nearLocations.data.results.length; i++){
                if(nearLocations.data.results[i].photos){
                    let photoCode= nearLocations.data.results[i].photos[0].photo_reference
                    const photoLocation = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoCode}&key=AIzaSyBKizswmWAb46dJxdiVPZp1zpUjDxC55lM`);
                    delete photoLocation.data
                    pictures.push(photoLocation.request.res.responseUrl)
                }
                else{
                    pictures.push("https://images.squarespace-cdn.com/content/v1/53eba4e8e4b0d8c733bbd45a/1413767586813-7KBCWBJ538XXVKJ2DKXF/ke17ZwdGBToddI8pDm48kAR7vG2QfD3uW0H7YLf9VaYUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcT3f5-rKIYluIX58xa6tfcBn_TXvNu7kmrqqSJvyZGOaDbqGgO06TDcYHqFgl4xk9/BAR.jpg")
                }
            }
                for(let i=0; i<places.length; i++){
                    places[i].picture=pictures[i]
                }
        }catch(e){
            console.log('error in getting location pictures:',e)
        }

        socket.emit(`locationsArry`, places);

    })

    socket.on('selectedLocation', (data) => {
        socketUser.location = data.selectedLocation

        if(!locations[data.selectedLocation]){
            locations[data.selectedLocation] = {}
        }

        locations[data.selectedLocation][data.user.socketId] = data.user

        for (const key in locations[data.selectedLocation]) {
            io.to(`${key}`).emit('nearbyUsers', locations[data.selectedLocation]);
        }
    })

    socket.on('reaction', (reactionObj) => {
        io.to(`${reactionObj.destinationUser.socketId}`).emit('reaction recieved', reactionObj);
        
        // for (let i = 0; i < users.length; i++) {
        //     if (users[i].socketId === reactionObj.destinationUser.socketId) {
        //         // console.log('users[i].notificationToken',users[i].notificationToken)
        //         const body = {
        //             content: {
        //                 data: {
        //                     message: "notification",
        //                 },
        //                 to: users[i].notificationToken
        //             },
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'key=AAAAz2kANlQ:APA91bFtwfVaUwO-d7CYV-BkeyqiXM93jaZtT4LeWZqrd6kXJbEefW-8yNZ8zHbKQA6X8aPZZoJlYKAcQ0IIfEkWOqN7qpvTyoWqBjBt2ZpyFJ7LgbTPQiExwkCjP-nFeqEYMhL7a8dI'
        //             }
        //         }
        //         axios.post('https://fcm.googleapis.com/fcm/send', body)
        //         .then( result => {
        //             res.end()
        //         })
        //         .catch( err => {
        //             // console.log('error')
        //         })
        //     }
        // }
    })

    socket.on('out of range', function (location) {
        console.log(`checking out user ${locations[location][socket.id].firstName}`)
        delete locations[location][socket.id]
        for (const key in locations[location]) {
            io.to(`${key}`).emit('nearbyUsers', locations[location]);
        }
    })

    //********* yoni have comment uot needs to change to work with object and not array
    //********* users array dosent exist any more
    // socket.on('push notification token', (token) => {
    //     console.log('token',token)
    //     console.log('users',users)
    //     for (let i = 0; i < users.length; i++) {
    //         console.log('socketId',socket.id)
    //         if (users[i].socketId === socket.id) {
    //             users[i].notificationToken = token
    //             console.log('userWithToken',users[i].notificationToken)
    //         }
    //     }
    // })  

    socket.on('disconnect', function () {
        console.log('user disconnected');

        if(socketUser.location){
            console.log('about to remove user:', socketUser.firstName)
            console.log('from location:', socketUser.location)

            delete locations[socketUser.location][socketUser.socketId]

            for (const key in locations[socketUser.location]) {
                io.to(`${key}`).emit('nearbyUsers', locations[socketUser.location]);
            }
        }
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
http.listen(process.env.PORT || PORT, function () {
    console.log('listening on *:8080');
});