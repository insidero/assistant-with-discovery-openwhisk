# Watson Assistant (formerly Conversation) with Discovery - OpenWhisk - Google Cloud Speech To Text


[![Build Status](https://travis-ci.org/watson-developer-cloud/assistant-with-discovery-openwhisk.svg?branch=master)](https://travis-ci.org/watson-developer-cloud/assistant-with-discovery-openwhisk) [![codecov](https://codecov.io/gh/watson-developer-cloud/assistant-with-discovery-openwhisk/branch/master/graph/badge.svg)](https://codecov.io/gh/watson-developer-cloud/assistant-with-discovery-openwhisk)

This application shows the capabilities of Watson Assistant and Discovery services to work together to find answers on a given query. In this sample app, the user is chatting with a virtual car dashboard, giving it commands in plain English such as "Turn on the wipers," "Play me some music," or "Let's find some food." If the user makes a request and Watson Assistant is not confident in its answer (e.g. "How do I check my tire pressure?"), Discovery will search the car manual and return the most relevant results, if relevant materials exist.

This demo is a reworking of [a previous one](https://github.com/watson-developer-cloud/assistant-with-discovery) but with an OpenWhisk back-end and React front-end. OpenWhisk is IBM's "serverless" offering, allowing users to upload functions to the cloud, call them via REST API, and pay only by the millisecond of usage.

## Table of Contents
* [How it Works](#how-it-works)
* [Run Locally](#run-locally)
  * [Getting Started](#getting-started)
  * [Setting up Watson Services](#setting-up-watson-services)
  * [Train Watson Services](#train-watson-services)
  * [Setting up the OpenWhisk Back-end](#setting-up-the-openwhisk-back-end)
  * [Setting up the React Front-end](#setting-up-the-react-front-end)
  * [Running the App](#running-the-app)
* [License](#license)

## How it Works

![Flow diagram](README_pictures/Flow_diagram.png?raw=true)

Under the hood, there are two components to this app:
* One is the front-end, which is simply static assets (HTML, CSS, and React), it uses CSS with Sass for cleaner, more maintainable source code.
* The other is the OpenWhisk actions:
  * When the user inputs text, the UI sends the current context and input to the OpenWhisk sequence. These are processed by the Watson Assistant service and returned, with an output and new context. The results are sent to the next action.
  * The Discovery action checks for a flag from the Watson Assistant output, and if it is present takes the original input and queries the manual with it. If there is no flag, the Watson Assistant results pass through the function unchanged. The Sequence returns the output and updated context back to the UI.


## Run Locally

### Getting Started
1. If you don't already have an IBM Cloud account, you can sign up [here](https://console.bluemix.net/registration/?cm_mmc=GitHubReadMe)
> Make sure you have at least 2 services available in your IBM Cloud account.

2. Clone (or fork) this repository, and go to the new directory
```bash
git clone https://github.com/watson-developer-cloud/assistant-with-discovery-openwhisk.git
cd assistant-with-discovery-openwhisk
```

3. Install [Node.js](https://nodejs.org) (Versions >= 6).

4. In the root directory of your repository, install the dependencies.
```bash
npm install
```

**Note**:  
If you receive the following error during `npm install`:
```
gyp ERR! stack Error: Python executable "python" is v3.4.3, which is not supported by gyp.
gyp ERR! stack You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.
```
Install Python 2.7.x and set npm to use. e.g.  
```npm config set python /path/to/python```  

### Setting up Watson Services
> Skip this section if you have downloaded the app from [Watson Console](https://console.ng.bluemix.net/developer/watson) and already have a `credentials.json` file

1. Create an instance of the Assistant service and get your credentials:
    - Go to the [Assistant](https://console.bluemix.net/catalog/services/conversation) page in the IBM Cloud Catalog.
    - Log in to your IBM Cloud account.
    - Click **Create**.
    - Click **Show** to view the service credentials.
    - Copy the `apikey` and `iam_apikey_name` value, or copy the `username` and `password` values if your service instance doesn't provide an `apikey`.
    - Copy the `url` value.

1. Create an instance of the Discovery service and get your credentials:
    - Go to the [Discovery](https://console.bluemix.net/catalog/services/discovery) page in the IBM Cloud Catalog.
    - Log in to your IBM Cloud account.
    - Click **Create**.
    - Click **Show** to view the service credentials.
    - Copy the `apikey` and `iam_apikey_name` value, or copy the `username` and `password` values if your service instance doesn't provide an `apikey`.
    - Copy the `url` value.

1. Create a `credentials.json` in the top-level directory.

1. Copy the following credentials into the file, amending for the instance name, url, apikey, and username/password; which can be found on each instance in the IBM Cloud console

> Example `credentials.json` file that configures the apikey and url for a Assitant and Discovery service instances
```json
{
  "discovery": [
    {
      "name": "Discovery-inst",
      "plan": "lite",
      "credentials": {
        "url": "enterUrl",
        "apikey": "enterApiKey",
        "iam_apikey_name": "enterApiKeyName"
      }
    }
  ],
  "conversation": [
    {
      "name": "Assistant-inst",
      "plan": "free",
      "credentials": {
        "url": "enterUrl",
        "apikey": "enterApiKey",
        "iam_apikey_name": "enterApiKeyName"
      }
    }
  ]
}
```


### Train Watson Services
Run following commands to train Watson Assistant and Discovery services:
``` bash
  npm run train
`
### Setting up the OpenWhisk Back-end
1. Install the Openwhisk [Command Line Interface](https://console.bluemix.net/openwhisk/learn/cli).

2. Download and install the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview).

3. Login by running the following:

```bash
ibmcloud login
ibmcloud target --cf
```

4. Install [jq](https://stedolan.github.io/jq/download/) as a dependency.

5. Run the provided shell script `create-openwhisk-actions.sh` to create your OpenWhisk actions & sequence. The syntax to do so may vary by system, but for example:

```bash
   sh create-openwhisk-actions.sh
```

### Setting up the React Front-end
Create an optimized build of your app. During this stage, your environment variable will be inserted into App.js for use by your components.
```bash
npm run build
```

### Running the App
All that's left is to serve your static files locally. You should see the app running in a new tab!
```bash
npm start
```

Example commands that can be executed by the Watson Assistant service are:
```
turn on windshield wipers
play music
```
In addition to conversational commands, you can also ask questions that you would expect to have answered in your car manual. For example:
```
How do I check my tire pressure
How do I turn on cruise control
How do I improve fuel efficiency
How do I connect my phone to bluetooth
```
## License
Licensed under [Apache 2.0](LICENSE).
