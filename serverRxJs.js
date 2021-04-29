const range = require('rxjs');
const {
    exhaustMap,
    tap
} = require('rxjs/operators');
const {
    Observable
} = require('rxjs');

// https://www.twilio.com/blog/async-js-rxjs-observables-rest-api-nodejs
//npm install @akanass/rx-http-request
const RxHR = require('@akanass/rx-http-request').RxHR;

const fetch = require("node-fetch");

const firstFunction = new Observable(subscriber => {
    console.log('First function');
    const movie = 'Lion King';
    const queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    subscriber.next(queryURL);
    //next.handle(queryURL);
});



// Use .subscribe() over .pipe() when you want to return the incoming data stream without any transformation.
const secondFunction = new Observable(subscriber => {
    //console.log('Second function');
    firstFunction.subscribe(queryURL => {
        console.log(queryURL);
        const movies$ = RxHR.get(`${queryURL}`, {
            json: true
        });
        movies$.subscribe({
            //console.log(movieResp);
            next(movieResp) {
                subscriber.next(movieResp);
            }
        });
    });
});

// Uses .pipe(exhaustMap()) as an alternative to .subscribe()
// Use .pipe() instead of .subscribe() when you need to transform the data stream using various operators like map, tap, exhaustMap available in .pipe() 
const secondFunction2 = new Observable(subscriber => {
    //console.log('Second function');
    firstFunction
        .pipe(
            // Use exhaustMap instead of map so that the subsequent .subscribe() waits for the response from API call.
            exhaustMap(queryURL => {
                console.log(queryURL);
                return RxHR.get(`${queryURL}`, {
                    json: true
                })
            })
        )
        .subscribe((movieResp) => {
            subscriber.next(movieResp);
        });
});


const thirdFunction = new Observable(subscriber => {
    //console.log('Third function');
    secondFunction2
        .pipe(
            tap(movieResp => {
                console.log(movieResp);
            })
        )
        .subscribe(() => {
            subscriber.next('Third Function');
        });
});

function main() {

   const thirdFuncPipe = thirdFunction.subscribe(y => {
        console.log('Now Calling third function');
        console.log(y);
    });

}

main();