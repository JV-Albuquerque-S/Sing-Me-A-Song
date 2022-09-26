<p align="center">
  <a href="https://github.com/JV-Albuquerque-S/Sing-Me-A-Song">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" alt="readme-logo" width="80" height="80">

  </a>

  <h3 align="center">
    Sing me a Song
  </h3>
</p>

## Description:

This is a pre builded fullstack application that you can share youtube video recommendations with several implemented tests using jest, supertest for the backend and cypress for the frontend.

<!-- ## Database deploy link
https://back-end-template-example.com/ -->

## Instalation:

```bash
$ git clone https://github.com/pablodamascenoo/singme-a-song.git
$ cd singme-a-song/back-end/
$ npm i
$ cd ..
$ cd singme-a-song/front-end/
$ npm i
```

## Usage:

- run backend on developer mode:

```bash
$ cd singme-a-song/back-end/
$ npm run dev
```

- after that, run the frontend:

```bash
$ cd singme-a-song/front-end/
$ npm start
```

## Back-end tests:

- Integration tests:

```bash
$ cd singme-a-song/back-end/
$ npm run test:int
```

- Unit tests:

```bash
$ cd singme-a-song/back-end/
$ npm run test:unit
```

## Front-end tests:

- To run the frontend tests, do the [Usage](#Usage) steps but the back-end usage must be like that:

```bash
$ cd singme-a-song/back-end/
$ npm run dev:test
```

- and then type the commands bellow:

```bash
$ cd singme-a-song/front-end/
$ npx cypress open
```

after that, click into the E2E Testing, start E2E testing in Electron and then, click on the chosen tes to run it.
