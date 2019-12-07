# Runaway

A SENG 350 Project.

Have you ever had a vacation planned to a country or area but are unsure of where to visit? Check out Runaway for reviews from travellers just like you.

## Set up

Have `node`, `docker` and `docker-compose` installed.

Install the node packages.

```bash
npm install
```

Run the build script.

```bash
npm run build
```

Start up the server using docker.

```bash
docker-compose up
```

Check out localhost:3000 to view the local build.

## Testing

To run the tests:

```bash
npm run test
```

To run the tests with code coverage:

```bash
npm run test -- --coverage
```

## Milestone 3

We chose to implement the following user stories:

-   As a user I want to be able to create an account/log in.
-   As an admin I want to be able to manage users so I can perform admin-related actions such as deleting/suspending accounts, etc.
-   As a user I want to be able to customize my profile.

We chose these user stories because they are straightforward to implement and because the rest of the stories will build on top of their implementation.

Our controllers are defined as routes. For our user stories, we have defined a login controller, sign up controller, profile controller (account controller in the diagram), and an admin controller. We still need to implement the auth middleware.

![Class Diagram](docs/class.png 'Class Diagram')

---

#### As a user I want to be able to create an account/log in.

Tracked issue [here](https://github.com/seng350/seng350f19-project-3-6/issues/1).

Our landing page (index) has two buttons: login or sign up. The sign up page lets the user create a new account. The login page lets the user login if they already have an account.

The sign up is handled by the sign up controller. Once the user inputs the required details in the sign up forms, the controller parses the data and creates a new user in the mongoDB. The user is then redirected to their new profile page.

The login is handled by the login controller. The user inputs their username and is redirected to their profile page.

---

#### As an admin I want to be able to manage users so I can perform admin-related actions such as deleting/suspending accounts, etc.

Tracked issue [here](https://github.com/seng350/seng350f19-project-3-6/issues/7).

On this page, the view shows a table with all users in the database and their relevant information fields. The user can delete a user by clicking a "delete" button. This will send a request to the admin controller, delete the user from the database, then refresh the view. The view should reflect the newly updated database.

The admin view should only visible by users who have admin privileges. This is verifed by a field in the user data, which can be true or false. The admin controller checks whether or not the user has the access rights to view this page. This feature is currently in progress.

---

#### As a user I want to be able to customize my profile.

Tracked issue [here](https://github.com/seng350/seng350f19-project-3-6/issues/5).

If the user is viewing their own profile page, they will be able to see an "Edit Profile" button. If the user is an admin, they will also be able to see another button "Admin Access" to view the admin dashboard.

The profile controller retrieves the user's data from the database and populates the view.

The "Edit Profile" functionality should bring the user to another page to edit their profile. This feature is currently in progress.

## Milestone 3.5

The following features were implemented during this milestone.

---

#### As a user, I can select a country and view its destinations.

On the index page, the user can select a country from the dropdown box. This dropdown is populated from the country model in the database.

When the user selects a country, they are brought to the country page. The country page is populated using the details from the country model. It has a short description about the country and lists the destinations within the country.

The user can select a destination to see the reviews.

---

#### As a user, I can select a destination and view its reviews.

From the country page, the user can view the destinations corresponding to each country.

When the user selects a destination, they are brought to the destination page, which lists all the reviews related to the selected destination. The destination page is populated from the destination model in the database.

The user can choose to create a view for the selected destination.

---

#### As a user, I can create a review in markdown and preview it before submitting.

On the destination page, the user can click on the "Create a Review" button to create a review for the destination they are currently viewing. The user will be redirected to an editor where they can write up their review in markdown and preview it before submitting.
