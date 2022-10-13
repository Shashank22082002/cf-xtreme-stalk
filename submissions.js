const request = require('request')

const submissionsFunc = (handle, tags, callback) => {
    const url = 'https://codeforces.com/api/user.status?handle=' + handle + ''
    request({ url: url, json: true }, (err, response) => {
        if (err)
            callback(err, undefined)
        else if (!response.body || response.body.status === "FAILED")
            callback(response.body.comment, undefined)
        else if (!response.body.result || response.body.result.length === 0)
        {
            console.log(response.body)
            callback("No submissions found"+response.body, undefined)
        }
        else {
            if (tags[0] === '' && tags.length == 1) {
                // console.log('Special case tags: ', response.body.result)
                // console.log('Special case tags: ', response.body.result.length)
                return callback(undefined, response.body.result)
            }
            const probs = response.body.result.filter((sub) => {
                let found = 1;
                for (let idx = 0; idx < tags.length; idx++) {
                    if (!sub.problem.tags.find((val) => {
                        return val === tags[idx]
                    })) {
                        found = 0;
                        break;
                    }
                }
                return found;
            })
            // console.log('Handle: ', handle)
            // console.log(probs.length)
            callback(undefined, probs)
        }
    })
}

module.exports = submissionsFunc