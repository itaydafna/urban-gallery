# Urban Gallery
### A high-performance image gallery app created with [React](https://github.com/facebookincubator/create-react-app), [Redux](https://redux.js.org/) and [Fixed-data-table-2](https://github.com/schrodinger/fixed-data-table-2).

To run the app locally:

1. Download or clone the repository.
2. Run `npm install` or `yarn`.
3. Run `npm start` or `yarn start`. 

The application will serve on  [http://localhost:3000](http://localhost:3000)

A **live demo** of the application can be found on this [**link**](https://snobbish-eye.surge.sh/).

## Responsive

The app support 2 view-sizes: 

**Desktop** and **mobile**

## Main challenge

The main challenge here was to load and display a numerous amount of images without settling for performance and speed.

To deal with this requirement - I made use of [Fixed-data-table-2](https://github.com/schrodinger/fixed-data-table-2) which only renders the image components in the viewport **once** - and just updates their src (without unmounting) once it detects a scroll event.

Additionally, I added an inner "Load only if needed" logic to the Image component which dispatches a network image-load only if the client stops scrolling for a given "load-delay" interval.

## Caching and Offline Support ##

In order to support offline use of the app - I created the following [service worker](https://github.com/itaydafna/urban-gallery/blob/master/src/services/fetch-cached-requests-service-worker.js) which utilizes the native [caches api](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) and supplements the [Create-React-App](https://github.com/facebookincubator/create-react-app) out of the box service worker using [this tool](https://github.com/bbhlondon/cra-append-sw).

 Please make sure you are running the app on [HTTPS](https://snobbish-eye.surge.sh/) in order to see this in action.


