# Pizze d'alieni - An Alien pizza place serving imaginary pizzas

What started as a project meant for me to fascilitate learning rudimentary Databases/SQL so I could call myself a full stack developer with bare minimum Docker knowledge sprinkled on top, quickly turned into so much more.

## Skills this project has fascilitated the learning of

### Database
- SQL (the postgres flavour)
- Importance of preventing SQL injection, and the power stored procedures (and functions) provide in that regard

### Docker
- Running, attaching, and printing logs of Docker containers
- Building Docker images from Dockerfiles, and how to extend other images.
- Organising deployment of several docker containers and docker networks with docker-compose
- Specifying open ports and other containers a container depends on
- Providing environment variables a container has
- Putting containers on networks with docker compose, isolating containers from each other when they don't need to communicate directly
- Providing volumes for docker containers to use for permanent data storage through docker-compose
- Familiarity with postgres as a database as well as a docker image, making use of database initialization scripts to build schema and stored procedures at first launch of application

### API
- Rudimentary knowledge of http requests
- Token creation and encryption at the API layer with jwt and bcrypt respectively
- Jest as a unit testing library, used sparsly in this project as it's been a means to ensure correct function of utility functions of any significant complexity, not merely 100% code coverage

### Front End
- Rudimentary cookie storing and reading knowledge for user sign in purposes
- Growing familiarity with TS and complex types such as typing of callbacks, mapped types, and the power of type narrowing
- CORS, it's roll in web security, and how to allow cross origin (this point could have been put under #API too)

### Unix-like Systems
- Growing familiarity with bash shell script
- Cron as a task scheduler for Unix-like systems, run as a docker container to periodically run database queries.

### Workflow
- Tmux's scripted sessions for quick loading all the parts of my work environment in an instance
- Vim dadbod UI as a means to do live querying (much like PGAdmin, but not GUI based)

## Future learning goals
- Make the API layer restful, instead of reinventing the wheel when it comes to the architectural style architectural style
- API limiters and other rudimentary DDoS prevention methods.
- Automated email service for email verification of signed up users, as well as for password resetting and account deletion

## What can be done on this site

On this website, you are able to do the following things

- View a list of pizzas served at this alien establishment, queried from a database
- View opening and closing times with dynamically updated status box showing if they are currently open or closed.
- Accept cookies! (Everyone's favourite thing to do on websites)
- Sign up and log in as a user on the site
- Put pizzas in a virtual cart
- If logged in, have cart content be synced with your user, such that it can be viewed even after logging out and in again. On another device too.

## Future plans for this project
- Card info is also stored with accounts
- Pay an actual real life cent for a real life email to be sent in
- Password reset option in case password is forgotten
- Change settings in your account such as profile name, preferred
  email, and card info
