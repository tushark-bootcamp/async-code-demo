const fetch = require("node-fetch");

// callback is just another function it takes as an argument. 
function firstFunction() {
    return new Promise((resolve, reject) => {
        resolve('First Function');
    })
}

function secondFunction() {
    var movie = 'Lion King';
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    return new Promise((resolve, reject) => {
        fetch(queryURL, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                mode: 'cors',
                cache: 'default'
            })
            .then(response => response.json())
            .then(json => resolve('Second function: ' + JSON.stringify(json)))
    });
}

function thirdFunction() {
    return new Promise((resolve, reject) => {
        resolve('Third Function');
    })
}

firstFunction()
    .then((data) => {
        console.log(data);
    })
    .then(() => {
        secondFunction()
            .then((data) => {
                console.log(data);
            })
            .then(() => {
                thirdFunction()
                    .then((data) => {
                        console.log(data);
                    })
            })
    })