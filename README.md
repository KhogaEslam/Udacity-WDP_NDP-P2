# Weather Journal App

The Weather Journal App is one of the projects required by Udacity in [Web Development Professional Nanodegree  Program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011) In [Egypt FWD Program](https://egfwd.com/web/)


## Table of Contents

* [Introduction](#introduction)
* [Project Structure](#project-structure)
* [How To Run](#how-to-run)


## Introduction

The Project is an asynchronous web app that uses Web API and user data to dynamically update the UI for a Weather-Journal App.
Starter code is cloned from Udacity [fend repository - Landing Page](https://github.com/udacity/fend/tree/refresh-2019/projects/weather-journal-app) Project.


## Project Structure

> website   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Contains website [front-end] files

>> style.css   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Contains Page's styles

>> index.html   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Contains HTML code

>> js   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Contains website [front-end] JS files

> server.js   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Contains all required server functionalities

> README.md     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // You are currently reading it :D


## How To Run


### Requirements

* Node
* Git

### Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/KhogaEslam/Udacity-WDP_NDP-P1.git
cd Udacity-WDP_NDP-P1
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser and try it.

## Deploy to Heroku
You can also deploy this app to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/KhogaEslam/Udacity-WDP_NDP-P1.git
```

Step 2: Build the Docker image

```bash
docker build -t Udacity-WDP_NDP-P1 .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d Udacity-WDP_NDP-P1
```