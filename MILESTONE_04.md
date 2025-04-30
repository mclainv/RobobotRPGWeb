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
(TODO: add url for your dpeloyed site; it's okay if it's different from the generated url from the grader's codespace)

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
This will show all of the servers which both you, the signed in user, as well as the discord bot are both members in.

First link to github line number(s) for constructor, HOF, etc.
---
https://github.com/mclainv/RobobotRPGWeb/blob/801db8090948fec521925321e23fd4d0169859e8/RobobotRPG-api/src/services/guilds/index.ts#L6

Second link to github line number(s) for constructor, HOF, etc.
---
https://github.com/mclainv/RobobotRPGWeb/blob/801db8090948fec521925321e23fd4d0169859e8/RobobotRPG-api/src/controllers/guilds/index.ts#L15

Short description for links above
---
There is a lot of login to handle permissions. The user cannot change the URL to see a server they don't have access to. They can only load the server data (icon, name) for servers they and the bot are both in. They cannot access the dashboard or menu unless they are authenticated! And, authentication persists across sessions.

Link to github line number(s) for schemas (db.js or models folder)
---
https://github.com/mclainv/RobobotRPGWeb/blob/8055e344f0679d7c537010f4b5f4728dabbf89cd/RobobotRPG-api/src/database/models/User.ts#L2

https://github.com/mclainv/RobobotRPGWeb/blob/8055e344f0679d7c537010f4b5f4728dabbf89cd/RobobotRPG-api/src/database/models/UserCompletedQuests.ts#L2

Description of research topics above with points
---
(TODO: add description of research topics here, including point values for each, one per line... for example: 2 points - applied and modified "Clean Blog" Bootstrap theme)

Links to github line number(s) for research topics described above (one link per line)
---
(TODO: add link to github line number(s), one per line for research topics ... for example, if using auth/passport, link to auth.js or where bulk of auth code is)

Optional project notes 
--- 
In order to use this website, you have to have my discord bot in one of your servers. Below is a link to add the discord bot to a discord server you have admin priviledges in. If this is too complicated, please see the attached video.

Attributions
---
(TODO:  list sources that you have based your code off of, 1 per line, with file name, a very short description, and an accompanying url... for example: routes/index.js - Authentication code based off of http://foo.bar/baz ... alternatively, if you have already placed annotations in your project, answer "See source code comments")