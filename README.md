# Lottery Game

#### Description
This is a lottery game application.

User after successful register > login, selects 5 numbers. Auto navigated to draw page and a random number appears every 4 second.

| Numbers match   |  Price won |
|----------|------:|
| 5/5 | 20 Euro |
| 4/5 | 10 Euro |
| 3/5 | 5 Euro  |

An option for saving bet and a history page exist.


## Technical Report

### Install dependencies and Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm i OR yarn add
quasar dev
```
### Build the app for production
```bash
quasar build
```

### Application architecture
Technologies used: 
`Quasar framework`
`Vue.js`
`Vuex`
`Vue Router`
`Firebase - Authentication, Firestore, Hosting`

Before the initialization of Vue Instance we ensure 2 things. Firebase is ready and authentication state. 
If user is not authenticated is redirected to login page.

After successful login, user is redirected to Home. There is a meta tag that checks if router page has permission.
There is a check for draw state to ensure that no draw is running. If draw is running, navigation is not permitted.

The user can save his bet to Firestore. 2 Collections are used.
This is the database structure
| Collections  |  Documents | Fields |
|----------|------|------|
| users | user_email | Map(D-timestamp_draw -> numbers_bet, timestamp, prize)|
| draws | D-timestamp_draw |numbers_draw, timestamp|

Relational key between users and draws is the D-timestamp_draw.

Pagination is cliend-side, Firestore queries limit is 10(free).
All draws fetched from server saved to Vuex store until Logout or re-fetched.
