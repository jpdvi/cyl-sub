# Cylera Submission


## Overview

This project uses `flask` and `react` in order to meet the requirements set forth in [INSTRUCTIONS.md](). Both projects were scoped to address the minimal subset of requirements with the exception of the `client` which does not allow for querying via url parameters but instead provides a GUI.


###  Thoughts
Additionally, if I had more time I would add an alternate view which ignores `window_time` in place of automatically calculating a delimiter. The reasoning behind this is that most of the data is outdated so using `now` as the default for `end_time` pretty much always results in a `404`.

☢ Unfortunately, there was not enough time to implement an exhaustive testing story for both projects.☢

### Requirements 

- [Client Requirements](#Client-Requirements)
- [Server Requirements](#Server-Requirements)

## Client 📺

The client is responsible for displaying data and utilizes `react`.  

### Client-Requirements
- `nodejs` : >= 12.16.1 (Latest LTS) 
- `npm` or `yarn`: This project was built and tested using yarn, use npm at your own risk.

### Install

To install modules in call `yarn` inside the `client` directory.

### Usage

To run the project call `yarn start` from within the `client` directory.

## Server 🛰

The http server is written in `python` using the `Flask` framework.  It utilizes `sqlalchemy` and `alembic` for it's ORM and migrations. 

### Server-Requirements
- `python` : >= 3.7
- [pipenv](https://pipenv.readthedocs.io/en/latest/install/) : Alternatively you can use the provided `requirements.txt` to generate your own environment using virtualenv or some other environment manager. However, you will need to manually export required environment variables provided in the `Makefile` as well as manually run the commands listed in the `run` task.
- [gnu make](https://www.gnu.org/software/make/manual/make.html): Used for orchestration due to ease of access across unix based systems.

### Install 

 To install the project call `make install` from the `server` directory as. However, if you have trouble you can call `pipenv install` from the `server` directory, or using the environment manager of your choice build from `requirements.txt`.

#### Environment Variables

Environment variables are hardcoded in the `Makefile`. However, if you need to manually set them see below.
- `SQLALCHEMY_DATABASE_URI` : sqlite:///bandwidth.sqlite3
- `FLASK_APP` : app

### Usage

 To run the project in call `make run` inside the `server` directory.
