const fetch = require("node-fetch");

// callback is just another function it takes as an argument. 
function firstFunction(callback) {
    console.log('First Function');
    callback();
}

function secondFunction(callback) {
    var movie = 'Lion King';
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     $("#movie-view").text(JSON.stringify(response));
    // });

    fetch(queryURL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            cache: 'default'
        })
        .then(response => response.json())
        .then(json => console.log('Second function: ' + JSON.stringify(json)))
        .then(() => callback());
}

function thirdFunction() {
    console.log('Third Function');
}

// firstFunction(function () {
//     secondFunction(function () {
//         thirdFunction();
//     });
// });

// ------ OR ---------------

firstFunction(() => {
    secondFunction(() => {
        thirdFunction();
    });
});