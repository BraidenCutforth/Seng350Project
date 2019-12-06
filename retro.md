# Milestone 6 - Retrospective
---

To summarize our application:

-   Typescript
-   Pug - HTML templates
-   Express - The requests router. Organizes the application into an MVC framework.
-   Node - Server-side scripting framework.
-   MongoDb - cloud database.

This is the tech stack of our application. The following section goes over the quality attribute scenarios that we focused on and how they were acheived.

## QAS 1: Modifiability

__Goal: Quick revert/deploy fixes__

We want to be able to deploy changes quickly so if a bad bug is introduced we can revert or fix and get that changed to users quickly.

//

## QAS 2: Performance

__Goal: Reviews are submitted and added to the site quickly.__

We want the site to operate quickly so that users stay on our site and don't go to competitors.

When a user submits a review, its automatically uploaded to our mongoDB database in the cloud. This means it should be immediately available for viewing up other users on the site.



## QAS 3: Performance

__Goal: Fast searching. __

We want the site to be fast and responsive so users stay on the site longer and don't go to a competitor.

//

## QAS 4: Performance

__Goal: Quick response timers. __

We want our users to feel like the app is fast, so they aren't annoyed and so they don't leave the site.

//

## QAS 5: Testability

-   Goal: Unit testing.
-   We want to easily and quickly validate that a decent part of our functionality works as intended and try to prevent side effects from being introduced.

We have unit tests for all our controllers and models. We test the encapsulated functionality within each controller.


## QAS 6: Security

__Goal: A user must login to do certain actions.__

We want to encourage users to create accounts and login so that we can keep track of our user base.

A user must be logged in to do certain actions. These are things like posting a review and editing a profile. A user will not be able to post reviews of edit a profile. These are actions we protect in the controllers. We keep track of whether or not you are logged in and if you try certain actions, you will be prevented from doing so.


## QAS 7: Modifiability

__Goal: Code in the routers is easy to modify.__

As a developer, I want to be able to easily modify code in the routers. This saves developer hours to contribute in other areas of developement.

Code in the controllers is partitioned in functions that encapsulate their functionality. For example, the login.ts controller has a function called parseUser. Information that is needed is passed into the controller (i.e not the whole request) and parsed data is returned. 
