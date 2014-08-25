[Payback Mobile Website] (http://paybackmobile.com)
===========

A simple ruby + rack application for serving a basic static website, suitable for deploying to [Heroku](http://heroku.com).
Their free 1-dyno plan should cover Payback for at least a year.

This is currently bypassing the Rail stack to simply display a static website.  A more complete Rails application will be
introduced when the functionality requires it.


Usage
-----

Run the app locally:

1. `gem install bundler`
2. `bundle install`
3. `bundle exec rackup`
4. Visit <http://localhost:9292>

Make something great, then push it to your [Heroku](http://heroku.com) account:

1. `gem install heroku`
2. `heroku login`
2. `heroku create --stack=cedar mynewapp`
3. `git push heroku master`