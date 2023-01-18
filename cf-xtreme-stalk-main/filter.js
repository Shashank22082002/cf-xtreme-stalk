const e = require("express");

const filterFunc = (list) => {
    const map = new Map();
    const solvedSet = new Set();
    const unsolvedSet = new Set();

    // console.log('here 1')
    // console.log(list)
    list.forEach(element => {
        if (element.verdict === 'OK') {
            solvedSet.add(JSON.stringify(element.problem))
        }
    })

    // console.log(solvedSet, "Solved Set")

    // console.log('here 2')
    list.forEach(element => { 
        // console.log("hell-",solvedSet.has(JSON.stringify(element.problem)))

        if (element.verdict !== 'OK' && !solvedSet.has(JSON.stringify(element.problem))) {
            unsolvedSet.add(JSON.stringify(element.problem))
        }
    }) 
    // console.log(unsolvedSet, "Unsolved Set");
    
    return {
        solved: solvedSet,
        unsolved: unsolvedSet
    }

}

module.exports = filterFunc