# Milestone 6 - Retrospective

## What we learned

We learned that there is a reason that libraries like React, Vue and Angular exists, to make web app development much easier.

We learned about a lot of formal methods/techniques for achieving application quality goals.

We also learned that planning out how complex pieces or your application will work before you worry about the easier stuff will help the overall structure of the application in the end.

## What we could do better

We should have written more tests initially. At first, we were focused on getting the application working, and we think more time should have been spent writing tests. We focused on functionality first then testing after. We did write our application in a testable manner luckily, but going back and writing tests after was more frustrating.

Additionally, we should have spent more time thinking about how our application should run. We built our project as an entirely server side app that would generate the HTML and send it back to the client. Only two pages contained client side javascript. We think that we would have considered making an app that ran more on the client side, but the effort required to get that to work as well would likely be much higher than the static app given no use of an MVC. Had we focused on making the application more client side, we believe certain features would have been easier to implement.

## How our design could be improved

One of our quality attribute scenarios was performance, and we believe our app would not scale very well. We believe that to begin, our data was very relational and we likely would have benefited from a relational database, both for storage efficiency (storage size of db) and for read speeds, especially with aggregating data.

Additionally, with every page navigation a request to the server is required. We would have been better off from a performance perspective having the user devices perform the computation for modifying the page, ie a client side app. With this we would only rely on the server for data modifications. This can be easy to design for scalability, since you offload computation to the user devices.

It would have also been a good design choice to move the controller logic out from the route logic. Our application was small so this wasn't an issue, but as an application grows this would make organization much better. We also could have abstracted some more common logic across our routes, but again since the application was small this wasn't a pressing issue.
