# Purrsuit - Find adoptable pets near you.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ea74f230-3795-4c15-9e58-0d3064230a29/deploy-status)](https://app.netlify.com/sites/purrsuit/deploys) [![Build Status](https://travis-ci.org/AndrewGroe/purrsuit.svg?branch=master)](https://travis-ci.org/AndrewGroe/purrsuit) ![W3C Validation](https://img.shields.io/w3c-validation/default?targetUrl=https%3A%2F%2Fpurrsuit.netlify.com)  ![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade/purrsuit.netlify.com)


This is a sample application showcasing Netlify Functions. They are primarily used to rapidly scaffold out an internal API for the purpose of retreiving data from an external API. In this context, they're connecting to the PetFinder API and GCP via cloud functions, which has the added benefit of hiding API keys from the client and this repository.

A demo can be found at https://purrsuit.netlify.com/

#### Features include:
* Vue.js
  * Vuex
  * Vue Router
* Serverless Architecture
* Netlify Functions (AWS Lambda)
  * Netlify CLI (run cloud functions locally)
* Axios for AJAX requests
* Petfinder API
* [Google Maps Services](https://github.com/googlemaps/google-maps-services-js)
* GCP
    * Geocode API
    * Places Autocomplete API
* Unit Tests (Jest)
* SASS & BEM CSS
* Responsive Design
  * Flexbox
  * Media Queries
* Pagination

## Getting Started

### Prerequisites

Clone this repo and link it to your Netlify account.

You'll need to have an API key for both Google Cloud Platform (Geocode API & Places Autocomplete) and the Petfinder API (you need both the ID and the SECRET).

Then add YOUR keys to your environment variables on Netlify's Dashboard (purrsuit > Settings > Build & deploy > Environment > Environment Variables). Create variables with the following names and paste in YOUR keys. You can find more information about Netlify's environment variables [here](https://docs.netlify.com/configure-builds/environment-variables/).
```
GCP_KEY
PETFINDER_CLIENT_ID
PETFINDER_CLIENT_SECRET
```

### Installing

Install project dependencies
```console
npm install
```
You'll need the Netlify CLI in order to run the cloud functions locally
```console
npm install netlify-cli -g
```

Next, link your local project with the one stored on Netlify's servers. Without this step, netlify-cli won't know where to get the environment variables you previously set from. More information about linking sites can be found [here](https://docs.netlify.com/cli/get-started/#link-and-unlink-sites).
```console
netlify link
```

Then run the app
```console
netlify dev
```

## Running Tests
Unit tests can be run using the following command
```console
npm run test:unit
```
