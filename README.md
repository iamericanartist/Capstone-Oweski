# OweSki - Front-End Capstone Project
## Rich Browser Applications / ![AngularJS](img/AngularJSLogo50px.png "AngularJS") & ![Firebase ](img/FirebaseLogo50px.png "Firebase ")
### [NSS](http://nashvillesoftwareschool.com/) Cohort D14 / Instructor - [Joe Shephard](https://github.com/JoeShep) / Advisors - [Christina Young](https://github.com/ChristinaJYoung) & [Callen Morrison](https://github.com/morecallan)

![OweSkiScreencap](img/oweskiDisplay.jpg?raw=true "OweSki Screencap")
[Check it out at OweSki.me](http://www.OweSki.me)


***
## PROPOSAL
### OweSki - “...so you KnowSki”
When two people go to lunch, get beers, buy a soda, etc., and one of the people buys and says “you get the next one”: Oweski is a way for both parties to track who owes whom. 
### OweSki Snapshot
OweSki is basically a “who’s turn is it?” tracker. 
Someone bought lunch? +1 to buyer / -1 to beneficiary

## NOTES
- OweSki is an idea I’ve had for a while now. A best friend and I have had a “mental” Oweski going for a while, and I’ve always intended to make it an application at some point; why not now?
- I see this as a phone app eventually, but functionally it could/should work just as well as a web app (make it responsive!) 

<!-- ## STRETCH GOALS
1. Use actual dollar amount rather than “tokens” or numerical tally.
1. Users can “My Treat” - a way to forgive an OweSki.
1. Create a QR code/ID number/etc to share app amongst friends, and to link to their OweSkis.
1. Users can trade OweSki’s with other users (a third party owes buyer above, and beneficiary above can get third parties to wipe both debts).
1. Link to gps flag to remind what/where the OweSki happened.
1. Link to Yelp/etc to pin the actual business.
1. Store images of the check with the beneficiary in the background (with a sad face of course). -->


***
## Requirements
1. Must have the ability to register a user in Firebase
1. Must have the ability to log in
1. You must be able to add OweSkis
1. You must use Firebase to store credits/dollar amounts
1. You must be able to add categories
1. You must be able to remove categories
1. Each OweSki must have the following properties
   1. tokenId
   1. positive value for one user and opposite for the other
   1. A boolean value that, if true, means that user has the positive or negative token value
1. It must be written with Angular
1. For the layout, should probably use Bootstrap


<!-- 
***
### Creating your project setup
Build a new application to keep track of movies that you have seen, and want to see, with your own ratings based on [OMDb API](http://omdbapi.com/).

[Setup Guide](https://docs.google.com/document/d/17h_xTgq4xaHlD9iayVECjK9VQqMZS-xpTSf3BoLALAA/edit)
 -->