# MeloMania

MeloMania is a soft clone of [SoundCloud](https://soundcloud.com/discover) Users can upload their music, listen to music uploaded by other users, make their own playlists of songs, and comment on each song.

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

![image]()

### User Sign Up Page

![image]()

### Song Detail Page
![image]()

### Playlist Page

![image]()




<!-- ### Search Results Page

![image](https://user-images.githubusercontent.com/95883222/163737653-481b15fe-6315-4f85-8bab-b489340b9fbc.png) -->

# Future Features
- Delete Confirmation for songs, comments, playlists
- Allow songs to play continuously from song to song and while navigating to different pages
- Edit playlists with deleting songs and changing title
- Add votes to songs and playlists
- Add comments to playlists
- Edit comments on songs and playlists
- User can view collections of their uploaded songs and created playlists
- User can view other user's collections of songs and playlists

# Technical Implementation

<!-- - One of our first challenges was search bar functionality: how to process an input and search for related information in the database. Our solution is to segment the input string into a list of words and query the question.content column for data containing any of the words.

```javascript
router.post(
  "/results",
  inputValidators,
  asyncHandler(async (req, res) => {
    let words = req.body.searchText.trim().split(/\s+/);

    const validatorErrors = validationResult(req);

    if (!validatorErrors.isEmpty()) {
      backURL = req.header("Referer") || "/";
      return res.redirect(backURL);
    }

    words = words.map((word) => `%${word}%`);
    const questions = await db.Question.findAll({
      where: {
        content: {
          [Op.iLike]: {
            [Op.any]: words,
          },
        },
      },
      include: [{ model: db.User }, { model: db.Tag }],
      order: [["createdAt", "DESC"]],
    });

    res.render("search-results", {
      title: "Search Results",
      questions,
      search: req.body.searchText,
    });
  })
);
```

- The other challenge was how to display a question and a list of answers on the question which are sorted by createdAt date. Our solution is to perform an eager loading to query of several different models, including Question, Answer and User, at once. Then we sort the answers of a question by createdAt and display the sorted answer on the page.

```javascript
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId, {
      include: [
        db.User,
        {
          model: db.Answer,
          include: db.User,
        },
        db.Tag,
      ],
    });

    const answers = question.Answers;
    answers.sort((a, b) => {
      const keyA = new Date(a.createdAt);
      const keyB = new Date(b.createdAt);
      return keyA < keyB ? -1 : 1;
    });

    answers.forEach((answer) => {
      answer.date = answer.createdAt.toDateString();
    });

    res.render("question-detail", {
      title: question.content,
      question,
      answers,
    });
  })
);
```

- custom validations on sign up input

```javascript
const userValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Username")
    .isLength({ max: 20 })
    .withMessage("Username must not be more than 20 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Username is already in use by another account"
          );
        }
      });
    })
    .custom((value) => !/^ *$/.test(value))
    .withMessage("Username cannot be empty"),
];
```

- Dynamically update answers without redirection

```javascript
submitBtn.addEventListener("click", async (submitEvent) => {
    submitEvent.preventDefault();
    const contentValue = document.getElementById(
      `${answerId}-edit-content`
    ).value;

    const questionId = parseInt(
      submitEvent.target.classList[0].split("-")[1],
      10
    );

    const res = await fetch(`/questions/${questionId}/answers/${answerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: contentValue,
      }),
    });

    const data = await res.json();
    if (data.message === "Success") {
      let contentEle = document.getElementById(`answer-content-${answerId}`);
      let lines = data.answer.content.split("\n");
      lines = lines.map((line) => `<div>${line}</div>`);
      contentEle.innerHTML = lines.join("");

      form.classList.add("hidden");
      answerContent.classList.remove("hidden");
      editAnswerButton.classList.remove("hidden");
      deleteAnswerButton.classList.remove("hidden");
    } else {
      if (data.message === "Failure") {
        const errorDiv = document.getElementById(`edit-errors-${answerId}`);
        errorDiv.innerHTML = data.errors[0];
      }
    }
});
``` -->


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
