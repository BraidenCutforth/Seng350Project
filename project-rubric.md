---
Title: Marking Rubric - Project
Authors: Neil Ernst

---

# Running Total (this will change each milestone):   45

NB: for all milestones, basic clean coding style: comments, standardized indentation, lack of code smells, is expected. Your submission and repository should show the following: 
	- Travis CI is being used (M3+)
	- a static analysis tool and linter has been applied (M3+)
	- Typescript project best practices are followed (M3+)

# Milestone 1   7  / 10

## Marking Guide	

- ASRs complete and capture
  - need to persist data
  - need to manage user state and cookies
  - security and privacy
  - usability
  - performance and latency
  - async issues

Marks deducted:

- scenarios seem to have little to no connection with the project (-2)
- poor technical writing  (-2)
- Quality of scenarios (clear analysis of stimulus, response, response measure)

## Notes M1

(explaining why marks were deducted)
-----

- the user stories are all a bit vanilla - no obvious connection to the essential nature of your app. It seems like not enough time was spent on what the app needed to be.
- QAS should be things that are important to the app, and also have design implications. 1.5 second response time raises the question, why 1.5? Why is that important, and what design changes will you have to make? 
- QAS are all very similar. Is performance really vital here? Seems like something like data integrity, or privacy, are equally important and more relevant to the design. 



# Milestone 2   19 / 20

## Marking Guide

- technical writing is clear and concise (key decisions are documented; organization is easy to follow; basic English spelling and writing conventions adhered to)
- design follows basic principles like cohesion/coupling, single responsibility, open/closed
- design addresses QAR from M1
- design provides path for implementing user stories in M1
- design models follow conventions for class and sequence diagrams
- design justifies technology choices
- ADRs (3+) explain why decision was taken, what the context is, and what alternatives were rejected
- ADRs don't capture trivial design decisions

## Notes M2

(explaining why marks were deducted)
-----

- The rationale as ADRs could be explained better to show the implementation of the QAS.

# Milestone 3   19 / 20

## Marking Guide

- code compiles
- code conventions/CI from above (commented, code style, design principles)
- working demo
- clear explanation of what user stories were satisfied in this iteration
- design as implemented follows design doc, or change rationale is present in README
- async is async when necessary
- TSLint does not complain
- test suite present/part of CI
- test coverage reasonable and meaningful

Marks deducted:

- Asynchronous programming was not followed everywhere. (-1)

## Notes M3

(explaining why marks were deducted)
-----

- Asynchronous programming was only done to connect to database. The read/write operation could also be implemented Asynchronously.
