const path = require('path')
const express = require('express')
const hbs = require('hbs')
const submissionsFunc = require('./submissions')
const getList = require('./result')
const filterFunc = require('./filter')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '/public')
const viewPath = path.join(__dirname, '/views')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "CF XTREEME STALK"
    })
})


app.get('/search', (req, res) => {
    if (!req.query.user) {
        res.send({
            error: 'Provide User Handle'
        })
    }
    else if (!req.query.friend) {
        res.send({
            error: 'Provide friend Handle'
        })
    }
    else {
        const userHandle = req.query.user
        const friendHandle = req.query.friend
        const tagsList = req.query.tags
        const list = tagsList.substring(1, tagsList.length-1).split(',')
        // console.log(typeof (tagsList))
        console.log(list)
        
        submissionsFunc(friendHandle, list, (err, response) => {
            if (err) res.send({ error: err })
            else {
                const friendList = response;
                // console.log("Friend response = ", response)
                console.log("Taglist = ", list)
                submissionsFunc(userHandle, list, (err, resp) => {
                    if (err) res.send({ error: err })
                    else {
                        // response and resp
                        let friendSolved = [], friendNotSolved = []
                        getList(resp, friendList, friendSolved, friendNotSolved);
                        console.log("friendSolved ",friendSolved)
                        console.log("FriendNotSolved ", friendNotSolved)
                        res.send({
                            solved: friendSolved,
                            unsolved: friendNotSolved
                        })
                    }
                })
            }
        })
        console.log(userHandle, friendHandle, tagsList)
        // res.send({
        //     recieved: "true",
        //     tags: list
        // })
    }
})

app.listen(port, () => {
    console.log('Server is up on Port ' + port)
})