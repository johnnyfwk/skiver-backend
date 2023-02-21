Skiver.co.uk is a social media app built using PostgreSQL, Express, React, and Node.js.

An Express API (Hosted URL: https://skiver.onrender.com/api) that supplies the frontend (Github: https://github.com/johnnyfwk/skiver-frontend, Live URL: https://skiver.co.uk/) with data stored in PostgreSQL.

The data used in this project are users' posts and comments.

To clone this repo:
- go to https://github.com/johnnyfwk/skiver-backend;
- near the top of the page, click on the 'Code' button;
- in the 'Local' tab, copy the HTTPS URL (https://github.com/johnnyfwk/skiver-backend.git);
- in Terminal, access the folder you want to hold the repo;
- type 'git clone https://github.com/johnnyfwk/skiver-backend.git' in the terminal (a repo named 'skiver-backend' will be created in the current folder);
- in Terminal, type 'cd skiver-backend' to go into that folder.
- This project uses packages that need to be installed in order for it to be run. To do this:

in Terminal, ensure you are in the 'skiver-backend' folder;
- type 'npm i'.

To connect to the development database and run the project, a development environment variable must be created:
- at repo root level, create a .env file named '.env.development';
- In this file, type in 'PGDATABASE=skiver'.

To create and seed all tables:
- in Terminal, type 'npm run drop-create-seed-all-tables'.

To run the project:
- in Terminal, type 'npm start'.