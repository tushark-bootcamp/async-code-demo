const fetch = require("node-fetch");

// callback is just another function it takes as an argument. 
function firstFunction() {
    console.log('First Function');
}

async function secondFunction() {
    var movie = 'Lion King';
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    await fetch(queryURL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            cache: 'default'
        })
        .then(response => response.json())
        .then(json => console.log('Second function: ' + JSON.stringify(json)));
}

function thirdFunction() {
    console.log('Third Function');
}

// The following style wont work as await can only be called from within an Async function 
// firstFunction();
// await secondFunction();
// thirdFunction();

async function main() {
    firstFunction();
    await secondFunction();
    thirdFunction();
}

main();