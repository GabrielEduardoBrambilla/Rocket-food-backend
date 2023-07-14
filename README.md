<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Rocket Food Frontend" />

&#xa0;

</div>

<h1 align="center">Rocket Food API</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/GabrielEduardoBrambilla/rocket-food?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/GabrielEduardoBrambilla/rocket-food?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/GabrielEduardoBrambilla/rocket-food?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/GabrielEduardoBrambilla/rocket-food?color=56BEB8">
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#sparkler-folder-organization">Folder organization</a> &#xa0; | &#xa0;
  <a href="#shipit-user-guide">Api routes</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a>

</p>
<p align="center">
<a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
<a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
<a href="#memo-license">License</a> &#xa0; | &#xa0;
<a href="https://github.com/GabrielEduardoBrambilla" target="_blank">Author</a> &#xa0; | &#xa0;
<a href="https://rocketfoodapi.onrender.com">App on Render</a>

</p>

<br>

## :dart: About

The Rocket Food API serves as the backend for the Rocket Food Frontend project, a web application designed for a restaurant. It provides a comprehensive set of routes for users to interact with the platform. Users can register on the API, create orders, make payments, and manage their favorite list of dishes through dedicated routes. The API includes routes for favorites listing, dish and ingredient search functionality, and a shopping cart integration powered by Stripe Payment Elements for seamless payment options, featuring a custom payment flow. Administrators have access to routes that enable efficient dish management, including the ability to create, edit, and remove dishes as per the specific requirements. Moreover, the API offers fuzzy search capabilities, allowing users to perform simultaneous searches by ingredients and dish names, ensuring an enhanced search experience.

## :sparkles: Features

:white_check_mark: File upload and read;\
:white_check_mark: Cryptographed data;\
:white_check_mark: Knex query builder;

## :sparkler: Folder organization

The provided image showcases the folder organization utilized for the api

![Api folder organization](https://i.imgur.com/ClclbhC.png)

## :shipit: Api routes

**Api access**

- Link: [go to api](https://rocketfoodapi.onrender.com)

**Main routes**

- Users
- Sessions
- Dishes
- Order

**Json routes**

- All routes have been exported to a [JSON-File](rocket-food-api-routes.json), and can be imported into insomnia if necessary

## :rocket: Technologies

The following tools were used in this project:

- [BCryptjs](https://www.npmjs.com/package/bcryptjs)
- [CORS](https://www.npmjs.com/package/cors)
- [Express](https://expressjs.com)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Knex](https://knexjs.org/)
- [Multer](https://www.npmjs.com/package/multer)
- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)
- [SQLite](https://www.sqlite.org/index.html)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting

```bash

# Clone this project
$ git clone https://github.com/GabrielEduardoBrambilla/rocket-food

# Access
$ cd rocket-food

# Install dependencies
$ npm

# Set environment variables
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
AUTH_SCECRET=
SERVER_PORT=

# Run the project
$ npm run dev

```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE) file.

Made with :heart: by <a href="https://github.com/GabrielEduardoBrambilla" target="_blank">Gabriel Eduardo Brambilla</a>

Note: Since the Api is hosted on a free service, after 15 minutes of inactivity it "hibernates" .
<br>
If you are trying to access the Api, and it1 is not responding, just wait as it will be "initializing" the services.
<br>
This step may take up to 1 minute, depending on the server load on Render.

## [The Api is available here](https://rocketfoodapi.onrender.com)

&#xa0;
<a href="#top">Back to top</a>
