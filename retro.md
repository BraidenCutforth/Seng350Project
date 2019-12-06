# Milestone 6 - Retrospective

To summarize our application:

-   Typescript
-   Pug - HTML templates.
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

__Goal: Fast searching.__

We want the site to be fast and responsive so users stay on the site longer and don't go to a competitor.

We have tried to design the user flow so that the user always has an option for what to do next. For example, login -> search -> destination -> review page. This gives the user the feeling that the app is always responsive and there's more content that can be explored.

## QAS 4: Performance

__Goal: Quick response timers.__

We want our users to feel like the app is fast, so they aren't annoyed and so they don't leave the site.

We didn't have the time to implement response measures through testing. Instead, we manually tested the application's response time. Our application is currently not complex enough to be visibily slowed, but in the future it will be important to test response time.

## QAS 5: Testability

__Goal: Unit testing.__
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

---

### What we learned

A lot. About build web applications from scratch, setting up database connections, routing requests using Express, static typing with typescript, templating with Pug, etc.

### What we could do better

We never got the chance to implement testing for response measures. Currently, we manually test for response time, and our application is small and lightweight enough that it doesn't take too long. But in the future, if the application got larger and more complex, it will be important to implmenet performance testing on response times.


### How our design could be improved

One of our quality attribute scenarios should have been responsiveness. Its important because a lot of web application users are mobile users nowadays. This is something else that we should test and design around.
