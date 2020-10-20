---
title: Creating markdown powered blog
subtitle: Nuxt, content and jamstack!
author: TheLearneer
banner: nuxt-markdown-blog.png
created: 2020-05-31
summary: >
  How to create a blog with mardown? How to use markdown to create a blog? If those are the question you have then with the awesome tools like Nuxt.js, nuxt-content and the awesome Jamstack concept the task gets easy like never before!
tags:
  - Jamstack
  - Markdown
  - Nuxt
---

You are reading this then that means you too are interested in creating a blog or alike website, Right ?? I too was very interested for the first time when I tried such stuff and even today when I make similar stuff I get hyped. Technically there are various methods of doing this. But of the most impressive and famous way is **Jamstack** and the entire article is based upon it.

## About Jamstack

So if you are already wondering what is jamstack and why jamstack, then you should head over to the [jamstack website](https://jamstack.org/) to know more about it. Because if I started talking about it, the article can get really long 😜. Altough the below listed are very basic ones but here are some awesome feature you should know:

- No need of server to host website
- Higher security
- Cheaper

With that being said, JAMstack makes things only better!

## Prerequisites

To get started with buliding your own blog we need to install few things. _You need to have **Node.js** installed on your machine!_

### Nuxt

It is the most essential stuff today. It is really easy if you know vue. Also it provides way more than just generating static sites. This is just one of its awesome features. With it you can try so many awesome things and it even makes so many complex stuffs really really easy. It also has an active community and really helpful developers and core team members. To know more about it you can have a look at the [official website](https://nuxtjs.org/)!

### Nuxt content

Nuxt content is an official module by the nuxt team which aims to provide ease to use features while working with _markdown_, _JSON_, _YAML_ and _CSV files. Although it is a preety nuch module by the nuxt team, it already contains really amazing feature which makes our task easier. Also the dev team is working to add new features to the module. So you should keep track of the module to learn about the new amazing features that the module will be getting. More information about it can be found [here](https://content.nuxtjs.org/)!

Thats basically what we will need to start developing the blog. So lets dive deep into building the blog!

## Development

There are few phases of developing the blog. I will try to explain them with minimum words but with maximum meaning. I hope it helps you!

### Writing a blog article

With the `@nuxt/content` module activated you can start with ease to write blog articles. ALl you should be doing is create a **content** directory in the root of your project directory and create files inside it. Generally you can place your article files directly inside the content directory. But if you plan to host files other than blog articles with the content module, I would suggest to create your articles inside `/content/blog` or any subdirectory of your choice. **I strongly recommend to place the markdown articles into a subdirectory. You will understand the reason while reading through this article!**

```md[/content/blog/article.md]
---
title: article1
---

## About this article
You can write any markdown content here and it can be easily displayed later!
```

As you see in the example above I have added YAML front matter block. All the items added will be injected into the article object and you will be able to see them when you fetch the article object. This can be really helpful if you want to add some properties to the article. You can even set the title, date, author details or anything else in the markdown file and later fetch, use them as you like.

All of your general content goes below the front matter block. You can do everything that you can do with a markdown file. On top of that you can even use html and vue components in the markdown file and with the magic of the module, it will be rendered properly. Which means you can customize your content in the markdown file completely! Also the content module provides syntax highlighting using [PrismJS](https://prismjs.com/). So you can even demonstrate codeblock examples!

There is a lot more to writing content though. You can definitely check it out [here](https://content.nuxtjs.org/writing/)!

### Fetching the blog article

Writing alone is not enough right? You would want to fetch the articles and display them. So why not look into fetching the articles next.

Fetching the contents is really really easy. The content module globally injects a **$content** instace, so you can access it anywhere within the project; either `this.$content` or `context.$content` based upon where you use it. That is really easy, isn't it?

Based upon the usage, I can think up of two specific ways you would want to fetch the content. We will look into both the usage methods below.

- Fetching all the articles to list them out
- Fetching a specific article to display it's content

The first use case for fetching the articles is to list them out. While fetching the article list you would either want to fetch all the articles or even filter the articles based upon some parameters. Here is how you would do that:

```js
// Fetching all the article list
const articles = await this.$content('blog').fetch();

// Fetching articles with filters
const articles = await this.$content('blog')
  .search('title', 'welcome')
  .fetch();

// Fetching specific article [1]
const article = await this.$content('blog', articleSlug).fetch();

// Fetching specific article [2]
const article = await this.$content('blog')
  .where({ slug: articleSlug })
  .fetch();
```

- The first method seen in the example above fetches all the articles inside the `/content/blog` directory.
- The second method also fetches all the articles inside the `/content/blog` but returns result matching the search criteria. _Useful when you are implement a search bar!_
- The third method fetches a specific article based upon the second parameter passed to it. **You get an object instead of array when fetching in this method!**
- The last method is just an alternative to the third method. **It returns an array instead of Object, so you might want to treat it as an array!** _Speaking from experience already..._

You might now always want all the properties of the content. For e.g. when listing title only, you can simply get only the title of the articles using the `.only()` method i.e. `.only(['title'])`. You can even limit the number of items in the result using the `.limit(n)` chainable method. Also you can skip number of results using the `.skip()` method.

I personally use the last method to fetch a specific article and I would even suggest you to do so. It is because it will work even if you decide to change the structure of your content directory and more stuffs here and there. _I personally do that a lot!_ But for the earlier method i.e. you will have to know the exact file location otherwise you will not be able to fetch it.

The content module provides way more control over how you fetch the articles. There is just too many possibilities how you can control fetching your content. It is as good as impossible to know about your specific use case. Thus to know how to customize your fetch request you can have a look [here](https://content.nuxtjs.org/fetching/)!

### Displaying the blog article

This has to be the most easiest task throughout this article. The content module provides a **use-and-enjoy** component which we will be simply using to display the content of our blog article.

```html[/article/_slug.vue]
<template>
  <div>
  <nuxt-content :document="article">
  </div>
</template>
```

The above example will simply display the content of the fetched article. How you customize the page is completely upto you yet again. The article passed into the `document` prop is the object that we obtained after fetching specific article after the dyanmic slug param. Theoritically that is all you should do to display the content of the article. But you would love to add more details right? You can simply modify the page template to show off your imagination!

Furthermore your page design will not be included into the markdown content. Thus if you want to customize the markdown with custom style you will have to do that like:

```css
/* Making the h2 component have red color. This is just me, you don't have be bad with examples! */
.nuxt-content h2 {
  color: red;
}
```

A live example of the usage can be found [here](https://github.com/nuxt/content/blob/master/docs/pages/_slug.vue#L65-L191)! I too have used the same thing... _No copyright please!_

### Working with dynamic routes

The core concept of this article is working with static generate site. So we will have to specify all the routes (_the article list for us_) while generating the site. This too is really easy with the content module. With that simple addition of the code below to `nuxt.config.js` your site will be ready to handle the dyanmic article page.

```js[nuxt.config.js]
export default {
  modules: [
  '@nuxt/content'
  ],
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content');
      const articles = await $content('blog').only(['slug']).fetch();

      // Generating the routes for the unique page of each article...
      return articles.map((article) => `/article/${article.slug}`);
    }
  }
}
```

**NOTE:** From 2.13+, `nuxt export` is said to have a crawler integrade to the core module. Which means the code above will not have to be injected into your config file!

That has to be all with the development of a basic markdown powered blog using `nuxt` and `nuxt-content`. If you did everything right then your blog should be working as well. If not just tell me in the comments below!

Also like any other module, content also provides customization options so that you can customize the behavious as you like. You can check about the customization options [here](https://content.nuxtjs.org/configuration)!

## Bonus

It was a really long article to write and I am preety sure it was hard to read it all as well. So I thought about sharing some interesting things with you guys. I actually wanted to list out points/stuffs which you might find interesting, and you can even integrate it with the blog you will be making with the awesome `content` module:

- [Netlify](https://www.netlify.com/): Host the blog you created right away!
- [Implement reading time](https://content.nuxtjs.org/advanced#contentfilebeforeinsert): You can implement reading time in your articles. _Details are from the official nuxt-content module!_
- [Sitemap](https://github.com/nuxt-community/sitemap-module): Let the web crawlers know each and every of your content!
- [Blog feeds](https://github.com/nuxt-community/feed-module): Let your community know when articles are out!
- [Nuxt color mode](https://github.com/nuxt-community/color-mode-module/): Which do you prefer, day or night ??
- [Nuxt components](https://github.com/nuxt/components): Get rid of those component imports that occur everywhere. _Comes with core nuxt 2.13+_
- [Disqus](https://disqus.com/): I love user engaged community!
  - [vue-disqus](https://www.npmjs.com/package/vue-disqus) to make things easy.
  - Optionally you can go for facebook comment plugin or other comment plugin provider!
- [**This site**](https://github.com/TheLearneer/santoshb.com.np) is a live example and demo of using this article! _Lots of changes will be made to the site and article itself to show what more you can do with it!_
