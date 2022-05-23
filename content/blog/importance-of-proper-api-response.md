---
title: Proper API Response structure {}
subtitle: Importance & Advantages!
author: TheLearneer
banner: api-response-structure.png
created: 2022-05-23
summary: >
  API are core part of every dynamic website. Without proper communication everything can be mess.
  So here are my thoughs on having an proper API response structure.
tags:
  - Development
  - API
  - Opinionated
---

ℹ️ **_Before starting to write anything I would like to mention that all this is my personal thoughts based on my knowledge, experiences and issues I have faced in the past._** ℹ️

It is the modern age of Internet, and there are thousands if not millions of website we have stumbled upon. Hundreds of which may be dynamic (i.e. fetch data whenever we request from some data source.)

The whole process of data fetching **in most of the cases** is done through API (SOAP, REST or GraphQL).
Thus you can consider an API as the translator between two people who talk two different language. Just imagine what would happen if the translator translates it wrong.

## Things to Consider

**Communication is key!**
<br />
Thus, there are lots of things which I think we should consider when setting up API response.

### Do not use top level data Objects or Arrays

I used to think it's easy to just send the data after fetching it directly from the Database.
<br />
For e.g. sending this response for API call `https://api.xyz.com/users/1`

```json
{
  "fullName": "Full Name",
  "dateOfBirth": "2000-01-01"
}
```

Or the e.g. below for API call `https://api.xyz.com/users`

```json
[
  {
    "fullName": "First User",
    "dateOfBirth": "2000-01-01"
  },
  {
    "fullName": "Second User",
    "dateOfBirth": "1990-04-04"
  }
]
```

While it will be easy to return the data like this, it will cause a huge problem sooner or later.
<br />
The major problem being **We can't add extra information in the first response object, and it's not even possible in the second response array.**

### Use consistent variable name casing

There are variable ways to name a variable:

- **camelCase** being the popular one around JavaScript developers.
- **snake_case** being the popular one around Python developers (_snake_case for Python developers... what a coincedence..._).
- PascalCase
- kebab-case

I think it was not really necessary to mention about it, because developers using a specific language already have their own preference over variable name casing.

_Just a note from my side; using multiple name casing in a single project is a big **NO**!_
<br />
If possible, I would even suggest everyone to grab a name casing technique and follow it throughout the entire journey of programming in life.

### Use proper variable names

This is not just for the API response object, but also the codes itself and Database entity itself as well.

I am pretty sure there are thousands of articles/notes metioning about how variable names should be written so I am not gonna go in depth, but I would like to attach a simple yet important note about this topic:
<br />
Variables name should be "**As short as possible, as long as required**"!

## Solution

The simple yet powerful solution to API response structure is to simply have the data structure as follow:

For e.g. sending this response for API call `https://api.xyz.com/users/1`

```json
{
"message": "Successfully fetched User data",
"data": {
  "fullName": "Full Name",
  "dateOfBirth": "2000-01-01"
}
```

Or the e.g. below for API call `https://api.xyz.com/users`

```json
{
  "message": "Successfully fetch Users data",
  "pagination": {
    "page": 1,
    "count": 2,
    "perPage": 10
  },
  "data": [
    {
      "fullName": "First User",
      "dateOfBirth": "2000-01-01"
    },
    {
      "fullName": "Second User",
      "dateOfBirth": "1990-04-04"
    }
  ]
}
```

You might have already noticed that I am able to send message in the API response. And also in the second API usage example, I am even able to send pagination details.
<br />
There will be thousands of data processing happening, so pagination is obviously to be done sooner or later. However in the previous approach we could not properly mention about the pagination details. Which we have overcome.

You might now be wondering, **Isn't it painful to access the data going one more level deep in the object?** i.e. `response.data` instead of `response`.
<br />
The answer is Yes, but apart from that downside, it's only good point I can think up of.

For e.g. lets say we have to respond with error message if the API request is invalid. Following this approach, we can simply send the response like:

```json
{
  "message": "Invalid email address" // or any other error message
}
```

And now in the frontend/mobile app, we can always refer to `response.message` to get the information about the API usage. And to understand if the API call was a success or failure, we can use HTTP status code of the API call.

### The main point

The major point of all this discussion is that the APi response should never be a top level data object itself.

Instead use an object which contains all the information you want ot share from server to frontend (not related to API).
<br />
And within the top level object, include the data related to the API call inside a `result` or `data` key.

This will result in **clean** and **consistent** API response acorss every API endpoint. And also you will be able to share extra information which is not related to the specific API call.

## Conclusion

I have done this mistake in the past and learnt a hard way from it. That doesn't mean you have to make this mistake yourself to learn.
<br />
You can try implementing this approach I have mentioned in your next project (or even your current project if possible without major breaking changes).

_If you are someone developing API, I would love to hear your thoughts about this approach and if you would like to switch to this approach (if not already using)._
<br />
_If you are someone who consumes API, I would love to hear your thoughts about how this change (if it is not what your current API provides) would affect you._

**If you are already using this approach, then cheers, you are making life of yourself and the frontend developer easy 😉**
