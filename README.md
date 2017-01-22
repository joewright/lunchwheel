# Lunch picker

This is a web app that lets you create a lunch team with a list of options. Each lunch team page has a decision maker so you can pick a place to get lunch.

### Getting started

You'll need values for the environment variables found in [example.env](example.env).

Once you have your environment set up, run the server

```bash
node index.js
```

If you have [heroku cli](https://devcenter.heroku.com/articles/heroku-cli) installed you can run locally by doing
```bash
# create an .env file
cp example.env .env

# run the app
heroku local
```