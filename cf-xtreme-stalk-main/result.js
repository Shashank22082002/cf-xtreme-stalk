const filterFunc = require('./filter')

// given 2 lists - listA, listB containing problem ids
// find all problems from listB which do not appear in listA
const getList = (listA, listB, friendSolved, friendNotSolved) => {
    const userSets = filterFunc(listA)
    const friendSets = filterFunc(listB)

    // console.log(solvedA)
    
    friendSets.solved.forEach((element) => {
        if (!userSets.solved.has(element)) {
            friendSolved.push(JSON.parse(element))
        }
    })

    friendSets.unsolved.forEach((element) => {
        if (!userSets.solved.has(element)) {
            friendNotSolved.push(JSON.parse(element))
        }
    })
}

module.exports = getList
