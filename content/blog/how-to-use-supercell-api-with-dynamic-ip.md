---
title: Working with Supercell API
subtitle: Dynamic IP and success!
author: TheLearneer
banner: supercell-api.png
created: 2020-03-07
summary: >
  Using the supercell games'  API requires a static IP, which means users doing hobby projects will not be able to use them.
  Not long after reading this article. I personally have got it working and so will you.
tags:
  - supercell
  - API
---

Almost everyone using the official Supercell games API has shown disagreement with the fact that the official API limit key to IP addresses.
Lots of the people using the API are using it personally for hobby projects and thus use free services. But that limitation of the Supercell API is causing lots of problem to the free users using the service.

**Thus to overcome that issue, I have though of this work around.**

## **How does it actually work?**

- It logins to the developer portal using the mail and password provided through the config.
- It then fetches the available API keys and checks if any key has the current IP whitelisted.
- If found returns the token, otherwise generate a new one for the current IP and return it.
- All the requests to the Official API are made then using the generated key

## **That sounds risky!!**

Well I am not sure about it to be honest but I am preety sure that things should be fine unless you are doing something really wiered! Although you should be aware of these stuffs:

- You are using your mail and password to login to the developer site so you should always make sure then are not publicly posted anywhere! `Important`
- This is not how supercell want's you to access the developer site and create a token and supercell might take actions against you, so make sure to use alternative mails for this purpose..
- Use this method until and unless you are able to get yourself with a **static IP**. If you get one, try to opt out of this method as soon as possible!
If you are doing what is mentioned above, you should be safe!

## **What extra can I do with it?**

You can **customize** the service as per your needs. If you need to save the resposes in some database for analytics purposes then you can simply edit the route files i.e. _{game}/routes/{file}_ and customize it as per the need. You can even add custom routes, remove the routes available or modify the available routes as per the requirements.

## **Heard enough! How do I use it?**

Yeah I have talked enough as well. The first thing is, the service is built using _express_ and contains a _index.js_ file to be started with. So all you got to do is run the file through command line as `node index.js`. But well I don't think you will be running it on your local machine. So I have some steps you can follow to host it over heroku. I do consider you already know about **heroku** and **github**.

- Fork this repo [TheLearneer/supercell-api](https://github.com/TheLearneer/supercell-api)
- Update the **config.js** to enable the API you want to use
- Create a new project at heroku
- Connect the heroku app to the forked repo (one at your profile)
- Enable automatic deploys and select `heroku` branch for it (_The heroku branch is setup for hosting at heroku_)
- In the setting tab add environment variables `GLOBAL_MAIL`, `GLOBAL_PASS`, `CLASH_MAIL`, `CLASH_PASS`, `ROYALE_MAIL`, `ROYALE_PASS`, `BRAWL_MAIL`, `BRAWL_PASS`
  - Set `GLOBAL_MAIL` and `GLOBAL_PASS` if you have the mail and password same over all the developer portals
  - Otherwise set the other variables with the individual values of mail and password over the respective developer portals
  - **NOTE:** `GLOBAL_MAIL` and `GLOBAL_PASS` Will surpass values of other relative variables

Doing all the steps mentioned above, you will have a working version of your service that works to receive data from the official API and works just like it. But currently due to the limitation of heorku, your API will sleep after 30 minutes of inactivity. Well it will not stop working but after that time the initial request will take a longer time.
To overcome this limitation you can use service like [uptimerobot](https://uptimerobot.com)

```js[config.js]
// Enabling the games
exports.games = {
  clash: false,
  royale: false,
  brawl: true
};

// Set mail and pass are same across all dev platforms
exports.global = {
  mail: 'shared-mail@gmail.com',
  password: 'shared-secret-key'
};

// Set mail and pass for single platform
exports.brawl = {
  mail: 'your-mail@gmail.com',
  password: 'secret-password-here'
};
```

## **How to use with full control?**

Technically it is possible by extracting the core of the project i.e. `util/tokener.js` in the github repository. This file is the reason behind the success of this concept. So if you want to have completely control over how you do stuffs while having this awesome feature, you can simply get the file from the github repo and use as your requirements.

## **How can I believe you are not lying?**

Well I can understand it's hard to believe something you just read up on internet. But I got a proof of concept to prove my words. [**CLICK HERE FOR PROOF OF CONCEPT**](https://statscell.herokuapp.com)

## **Anything else?**

Thats all from me. But if you got anything you can contact me through my contact mail. But if it is some Bug or feature idea, simply report it over at the original Repository. I will be more than happy to hear feedback from you guys.
