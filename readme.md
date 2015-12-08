#Potluck 

##Developers

* Brendan Frick
* Nathan Yeazel
* Neha Rathi
* Sujana Perumal


##Description
POTLUCK is an iOS only app which gives you an easy way to create lists of items to buy and share with your friends and family. Whether it's a grocery list or planning out your next party, Potluck has you covered!

###System Requirements

* Supersonic (install Supersonic- http://www.appgyver.com/) 
* Node.js


##Installation Instructions



##Running the App

Fork the repository and run: 

+ $steroids update
+ $steroids connect

### Deploying the App

Mac: In terminal, navigate to the directory where the grocery_list is downloaded and run :

+ $ steroids deploy
+ 
A link with the QR code will be generated which can be shared.



###Platform Requirements
The app can be built and modified on any version of Mac or Windows that is supported by Steroids.
The last version of Steroids that we ran our app with was v4.1.21
We did all of our testing for the app on iOS 8 and 9

###Known Issues
•When running the app on a phone that is connected via LTE (as opposed to wifi) there can be issues with uploading photos to the database.

•If multiple users try to commit to the same item simultaneously, there is no assurance as to which one will go through to the database. Sometimes the database will receive a null value in this case

###Next Steps

