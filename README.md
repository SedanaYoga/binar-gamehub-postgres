<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Enhance Binar GameHub with PostgreSQL (Sequelize)</h3>
  <p align="center">
    Get to know Database, ORM, and Sequelize for PostgreSQL

  </p>
</div>

<!-- ABOUT THE PROJECT -->

# About The Project

A repository for completing Binar Fullstack Web Development Bootcamp - Chapter 6.
![Dashboard Page][dashboard]
![Profile Page][profile-page]
![Sign In Page][signin-page]
![Sign Up Page][signup-page]
![Update User Page][update-user-page]

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

The following lists show my development stack:

- [Bootstrap v5.0](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [Vanilla Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [NodeJS including NPM](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [EJS as View Engine](https://ejs.co/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Sequelize](https://sequelize.org/)

Tools:
[Git](https://git-scm.com/)
[Neovim](https://neovim.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

## What I've learnt?

Kind of additional page for previous challenge, this chapter I learnt about database stuff (POSTGRESQL) like:

- `ORM in General` => I fully understand how's ORM works now, since then I just not get into ORM. Here, Object Relation Mapping is very important to enhance our development experience, can't imagine managing database without it!
- `PostgreSQL` => I know SQL's been a query language for ages, but here I know if postgreSQL can be effective and efficient solution for relational database, even though the installation is not that easy.
- `Sequelize` => Never heard this before and when I know it, I have some headache on association feature and of course the promise style this sequelize has. But when I get used to it, it's fun enough, at least once I found and able to resolve bugs that took me hours :D
- `UI to Database` => Have a great experience in connecting UI elements dinamically as per the database via EJS (View Engine) and Sequelize (ORM).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

# Getting Started

## New Feature
- You can sign up and decide if you want to be an Admin or not, this makes you have different capabilities in managing users
- RESTFUL API available at `/api/v1`
- New RPS Game logic using Threshold Point which defined as 6 points (Game Result will be sent to database after the sume of user & comp points meet 6 points)

## Prerequisites

If you want to edit the code, you need to have `nodejs` and `NPM`. Note: Sass files are not included here.

- Install all dependencies by this command if you already get node and npm installed in your system.

```sh
npm install
```

- You also need the to install PostgreSQL, download postgresql [here](https://www.postgresql.org/download/)
- Setup `/config/config.json`

```js
"development": {
    "username": <Your PostgreSQL Username>,
    "password": <Your PostgresSQL Password>,
    "database": "binar_gamehub",
    "host": "localhost",
    "dialect": "postgres"
  },
```

- Setup database using sequelize-cli for database migration and seeding, follow instruction [here](https://sequelize.org/master/manual/migrations.html)

Do this in sequence

```sh
sequelize db:drop
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```
- Set up `.env` file in root path and put this string in it 
`NODE_ENV=development`

# Usage

- Start the server by this command, it will run `node app.js`
  ```sh
  npm run start
  ```
- Open `localhost:5000` in your browser
- Available Users

| Email          | Password | Is Admin? |
| -------------- | -------- | --------- |
| admin@mail.com | 123      | TRUE      |
| syoga@mail.com | 123      | FALSE     |

<p align="right">(<a href="#top">back to top</a>)</p>

# PostgreSQL Table Structure

## The Tables

`user_games`

| Column    | Type    | Constraint | Value          |
| --------- | ------- | ---------- | -------------- |
| id        | INTEGER | PK         | Auto Generated |
| uuid      | UUID    | \-         | Auto Generated |
| username  | STRING  | NOTNULL    | input          |
| password  | STRING  | NOTNULL    | input          |
| email     | STRING  | NOTNULL    | input          |
| createdAt | DATE    | NOTNULL    | Auto Generated |
| updatedAt | DATE    | NOTNULL    | Auto Generated |

`user_game_histories`

| Column              | Type    | Constraint        | Value                 |
| ------------------- | ------- | ----------------- | --------------------- |
| id                  | INTEGER | PK                | Auto generated        |
| uuid                | UUID    | \-                | Auto generated        |
| fk_userId_histories | INTEGER | FK                | User ID               |
| user_id             | STRING  | \-                | User UUID             |
| score               | INTEGER | 1, -1, 0, NOTNULL | Fetched from the game |
| createdAt           | DATE    | NOTNULL           | Auto Generated        |
| updatedAt           | DATE    | NOTNULL           | Auto Generated        |

`user_game_biodata`

| Column            | Type    | Constraint | Value          |
| ----------------- | ------- | ---------- | -------------- |
| id                | INTEGER | PK         | Auto Generated |
| uuid              | UUID    | \-         | Auto Generated |
| fk_userId_biodata | INTEGER | FK         | User ID        |
| user_id           | STRING  | \-         | User UUID      |
| full_name         | STRING  | \-         | input          |
| dob               | STRING  | \-         | input          |
| address           | STRING  | \-         | input          |
| contact           | STRING  | \-         | input          |
| createdAt         | DATE    | NOTNULL    | Auto Generated |
| updatedAt         | DATE    | NOTNULL    | Auto Generated |

## The Association

[![Table Association][table-association]](https://drawsql.app/syoga/diagrams/binar-gamehub)

# API Documentation

I created two branches of accessing API, from Portal and API Explorer.
- API Explorer => You can view summary table in path `localhost:5000/api/v1/`
- Portal API will be explained below

## Sign-In

Will do a sign in behavior, checking `email` and `password` that user input in the form.

### Request

`POST /sign-in`

### Response

Redirect to Home Page with user that has already logged in

## Sign-Up

Will need user input `email`, `username`, `password` to make a request to register new user to the database.

### Request

`POST /users`

### Response

Redirect to Home Page with the new user that has already logged in.

## Rock Paper Scissor Game

The game logic is using threshold point, it's been set to 6. Means, the result will be out when
`user.points + comp.points = 6`
User will be win if the score is either 0-6, 1-5, 2-4
User will be lose if the score is either 6-0, 5-1, 4-2
User will be drawn if the score is 3-3

### Request

`POST /histories`

### Response

The response will take affect in backend side. The a history data row will be generated, if win = 1, lose = -1, draw = 0.

## Dashboard

In Dashboard we will be able to View, Update, or Delete all users.

### Request

`GET /users`

### Response

Will get json response of user data but not including histories and biodata yet.

### Request

`GET /users/:uuid`

### Response

Will return html page to the profile of the params `uuid`

### Request

`GET /users/:uuid/update`

### Response

Will return html page to update user data of the params `uuid`

### Request

`POST /users/:uuid/update`

### Response

Update the user data to the database and redirect to the `dashboard` page

### Request

`GET /users/:uuid/delete`

### Response

Delete user with method `GET` since HTML only provide `GET` and `POST` method.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Sedana Yoga - [@cok_yoga](https://twitter.com/Cok_Yoga)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[table-association]: public/images/table-association.png
[dashboard]: public/images/dashboard.png
[profile-page]: public/images/profile-page.png
[signin-page]: public/images/signin-page.png
[signup-page]: public/images/signup-page.png
[update-user-page]: public/images/update-user-page.png
