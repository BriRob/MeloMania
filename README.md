# MeloMania

MeloMania is a soft clone of [SoundCloud](https://soundcloud.com/discover). Users can upload their music, listen to music uploaded by other users, make their own playlists of songs, and comment on each song.

MeloMania live site: [MeloMania](https://melomaniamusic.herokuapp.com)

# Index

[MVP Feature List](https://github.com/BriRob/MeloMania/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/BriRob/MeloMania/wiki/Database-Schema)


# Technologies Used

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/><img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"  height=40/><img  src="https://seeklogo.com/images/R/redux-logo-9CA6836C12-seeklogo.com.png"  height=40/>

# Getting started

1. Clone this repository

   `git clone https://github.com/BriRob/MeloMania.git`

2. Open up two terminals. CD into backend directory in one terminal and CD into frontend directory in second terminal. Install dependencies in both directories

   `npm install`

3. Create a .env file based on the .env.example file with proper settings for your development environment

4. Setup your PostgreSQL username and password based on your .env file

   ` psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"`

5. Create database and migrate models

    `npx dotenv sequelize db:create` &&
   `npx dotenv sequelize db:migrate` &&
   `npx dotenv sequelize db:seed:all`

6. Setup your AWS bucket using [AWS setup](https://github.com/jdrichardsappacad/aws-s3-pern-demo#set-up), change the bucket name to your bucket name in `awsS3.js` file, and update your `.env` file with AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

7. Start the app for both backend and frontend using:

   `npm start`

8. You can use the Demo user or create an account



# Features

## User Authentication

Logged out users can login into or sign up for their account. The Demo User feature allows logged out users to test the site as a logged-in demo user without making or logging into an account.


## Songs

Logged out users can:
- Listen to any song available on the splash page
- View one song's details and listen to that song

Logged in users can:
- Listen to any song available on the splash page
- View one song's details and listen to that song
- Add their own songs
- Edit their own songs
- Delete their own songs


## Playlists
Logged out users can:
- View any song playlist available on the playlist page
- Listen to the songs available on each playlist

Logged in users can:
- View any song playlist available on the playlist page
- Listen to the songs available on each playlist
- Add their own playlist
- Delete their own playlist
- Add any song to their playlists


## Comments
Logged out users can:
- View all comments on a song's page

Logged in users can:
- View all comments on a song's page
- Add a comment on a song's page
- Delete their own comment on a song's page


### Home Page / Songs Page

![melomania-splash-page](https://user-images.githubusercontent.com/95938897/167426677-202ae7b4-092e-467b-9a33-d149369e5139.png)


### User Sign Up Page

![melomania-signup-page](https://user-images.githubusercontent.com/95938897/167427158-0b7f1a36-51ba-41b1-8da7-1d8d7c8395b0.png)


### Song Detail Page

![melomania-songDetail-page](https://user-images.githubusercontent.com/95938897/167427619-5d221f6e-c1ad-4733-83f5-74cf7da6448c.png)


### Playlist Page


![melomania-playlists-page](https://user-images.githubusercontent.com/95938897/167427899-2e730ff6-d384-4d0e-bcc0-8fcbfd2f3544.png)


# Future Features
- Delete Confirmation for comments and playlists
- Allow songs to play continuously from song to song and while navigating to different pages
- Edit playlists with deleting songs and changing title
- Add genre tags for songs
- Add votes to songs and playlists
- Add comments to playlists
- Edit comments on songs and playlists
- User can view collections of their uploaded songs and created playlists
- User can view other user's collections of songs and playlists

# Technical Implementation

- There was a significant challenge with implementing redux for the playlist feature. In the end, I started understanding when it's truly necessary to make a call to the redux store to acquire data verses when it's best to just use the redux state that was already given. At first, I thought I would need to call the redux store for getting all playlists, getting one playlist, creating playlists, getting playlists for a specific user, creating a new many to many relation between a song and a playlist, and deleting a playlist. When I completed the feature, I only made calls to the redux store for getting all playlists, creating playlists, removing playlists, and creating a new playlist to song relation.


```javascript

export const getAllPlaylists = () => async (dispatch) => {
  const response = await fetch("/api/playlists/");

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getPlaylists(playlists));
    return playlists;
  }
};

export const createNewPlaylist = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/playlists/new-playlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newPlaylist = await response.json();
    dispatch(createPlaylist(newPlaylist));
    return newPlaylist;
  }
};

export const createSongsPlaylistRelation = (payload) => async (dispatch) => {

  const response = await csrfFetch(
    `/api/playlists/new-playlist-song-relation`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!data.message) {
    let relation = data
    dispatch(getAllPlaylists());
    return relation;

  } else {
    throw new Error(data.message)
  }
};

export const deletePlaylist = (playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "delete",
  });

  if (response.ok) {
    const { playlistId } = await response.json();
    dispatch(removePlaylist(playlistId));

  }
};


const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      const allPlaylists = {};
      action.playlists.forEach((playlist) => {
        allPlaylists[playlist.id] = playlist;
      });
      const allPlaylistsState = { ...state, ...allPlaylists };
      return allPlaylistsState;

    case CREATE_PLAYLIST:
      const newFullList = Object.assign({}, state);
      newFullList[action.playlist.id] = action.playlist;
      return newFullList;

    case REMOVE_PLAYLIST:
      const newRemovePlaylistState = Object.assign({}, state);
      delete newRemovePlaylistState[action.playlistId];
      return newRemovePlaylistState;

    default:
      return state;
  }
};
```

- another challenge was implementing error handling to ensure the user only uploads mp3 files with AWS without express-validator

```javascript
router.post(
  "/new-song",
  singleMulterUpload("url"), // was "image"
  requireAuth,
  songFormValidation,
  asyncHandler(async (req, res, next) => {

    const userId = req.user.id;
    const { title, url, description } = req.body;

    if (req.file) {
      const songUrl = await singlePublicFileUpload(req.file); // was profileImageUrl

      if (songUrl.indexOf(".mp3") == songUrl.length - 4) {
        const newSong = await Song.create({
          userId,
          title,
          url: songUrl,
          description,
        });

        return res.redirect(`${req.baseUrl}/songs/${newSong.id}`);
        
      } else {
        const err = new Error("file must be .mp3");
        next(err);
      }
    } else {
      const noFileErr = new Error("Cannot submit post without file");
      next(noFileErr);
    }
  })
);
```



<!-- 
# Deploy to Heroku

1. Add a new application in your Heroku dashboard named whatever you want.

2. Under the "Resources" tab in your new application, click "Find more add-ons" and add the "Heroku Postgres" add-on with the free Hobby Dev setting.

3. install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

4. Login into heroku through terminal using
    `heroku login`

5. Add Heroku as a remote to your project's git repository in the following command and replace <name-of-Heroku-app> with the name of the application you created in the Heroku dashboard.

    `heroku git:remote -a <name-of-Heroku-app>`

6. Navigate to your application's Heroku dashboard. Under "Settings" there is a section for "Config Vars". Click the "Reveal Config Vars" button to see all your production environment variables. You should have a DATABASE_URL environment variable already from the Heroku Postgres add-on.

    Add all environmental variables and their values into "Reveal Config Vars"

7. Push your project to Heroku
    `git push heroku main`

8. Migrate your production database
    `heroku run npm run sequelize db:migrate`
    `heroku run npm run sequelize db:seed:all`
 -->
