Milestone 04 - Final Project Documentation
===

NetID
---
rma9540

Name
---
McLain Adams

Repository Link
---
https://github.com/mclainv/RobobotRPGWeb

URL for deployed site 
---

https://supreme-garbanzo-5gg6456vg4p2777v-3000.app.github.dev/
- This probably won't work, meaning it will only show some frontend pages. Github codespaces doesn't handle my API at all being on a different port, since it creates a new subdomain for each port. So, the cookies end up stored on a different port.

On local development (and the production servers I'm testing (render)), this isn't a problem. The client is served over {url}:3000, the api on {url}:3001/api.

URL for form 1 (from previous milestone) 
---

/
root
{url}:3000/
This allows you to login using discord URL.

Special Instructions for Form 1
---

You can sign in using your discord account.

URL for form 2 (for current milestone)
---
{url}:3001/api/auth/discord

Special Instructions for Form 2
---
This is the API route, which I'm including because it took the most effort to create.

URL for form 3 (from previous milestone) 
---

/menu

Special Instructions for Form 3
---
This will show all of the servers which both you, the signed in user, as well as the discord bot are both members in. When you click on one, it will pull info about the server. The frontend nextJS client is going to make a call to the backend, and then they both confirm server priviledges (discord servers are called guilds in the discord api and in my code).

Links to github line number(s) for constructor, HOF, etc.
---
https://github.com/mclainv/RobobotRPGWeb/blob/801db8090948fec521925321e23fd4d0169859e8/RobobotRPG-api/src/services/guilds/index.ts#L6

https://github.com/mclainv/RobobotRPGWeb/blob/801db8090948fec521925321e23fd4d0169859e8/RobobotRPG-api/src/strats/discord.ts#L20-L51

Short description for links above
---
There is a lot of login to handle permissions. The user cannot change the URL to see a server they don't have access to. They can only load the server data (icon, name) for servers they and the bot are both in. They cannot access the dashboard or menu unless they are authenticated! And, authentication persists across sessions.

Link to github line number(s) for schemas (db.js or models folder)
---
https://github.com/mclainv/RobobotRPGWeb/blob/8055e344f0679d7c537010f4b5f4728dabbf89cd/RobobotRPG-api/src/database/models/User.ts#L2

https://github.com/mclainv/RobobotRPGWeb/blob/8055e344f0679d7c537010f4b5f4728dabbf89cd/RobobotRPG-api/src/database/models/UserCompletedQuests.ts#L2

Description of research topics above with points
---
- 4 points - authentication with passport, discord, express cookies, mongodb, etc. The user stays authenticated for some amount of time after logging in. User information is stored in mongoDB, but a sessionID is stored in a browser cookie. 

- 4 points - NextJS, JSX components, SASS as well. I used an entirely new setup than I was used to. It was incredibly rewarding. I also started using Typescript which made things a lot less confusing when I was creating the API. It didn't make much difference when creating the web client.

- 2 points - Separating express web api from web client, complex routes. This completed changed the way I was coding web projects.

Links to github line number(s) for research topics described above (one link per line)
---
https://github.com/mclainv/RobobotRPGWeb/blob/801db8090948fec521925321e23fd4d0169859e8/RobobotRPG-api/src/routes/auth/index.ts#L6
https://github.com/mclainv/RobobotRPGWeb/blob/801db8090948fec521925321e23fd4d0169859e8/robobotrpgweb-client/src/components/misc/index.module.scss#L26

Optional project notes 
--- 
In order to use this website, you have to have my discord bot in one of your servers. Below is a link to add the discord bot to a discord server you have admin priviledges in.

Deployment is not working yet, while grading feel free to check the repo and see if the site is deployed. I will link the website in the repo. For now, I've linked a video of it working.

In the video, I show that there is protection against visiting invalid guilds (guilds you don't have access to or invalid guilds will redirect), and also that the login/auth/user session is stored in a cookie. The sessionID links to a mongoDB user with an auth token from discord.

[Check repo here](https://github.com/mclainv/RobobotRPGWeb)
[Watch video demo here](workingVideo.mp4)

https://discord.com/oauth2/authorize?client_id=1362639218597302502


Attributions
---
