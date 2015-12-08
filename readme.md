#Potluck 




###Description
POTLUCK is an iOS only app which gives you an easy way to create lists of items to buy and share with your friends and family. Whether it's a grocery list or planning out your next party, Potluck has you covered!

###System Requirements

* Supersonic  
* Node.js


##Installation Instructions
Follow the instructions on the [Appgyver Website](https://academy.appgyver.com/installwizard/steps#/home) to install supersonic on your machine. 

    clone this repository to your computer 
    $git clone https://github.com/eecs394-fall15/grocery_list


##Integrating with Parse Database

Potluck uses Parse DB as backend. Signup for an account on [https://parse.com/] and create an app called grocery
+ Go to Settings -> Keys . 
+ You will find the Application Key id and Javascript key.

Add the below two lines in *app/common/view/layout.html* to Integrate parse to the app

    <script src="//www.parsecdn.com/js/parse-1.6.4.min.js"></script>
    <script>Parse.initialize("*Application_key_Comes_Here*", "*Javascript Key comes here*");</script>







##Running the App

Fork the repository and run: 

+ $steroids update
+ $steroids connect

### Deploying the App

In terminal, navigate to the directory where the grocery_list is downloaded and run :

+ $ steroids deploy
 
A link with the QR code will be generated which can be shared.



###Platform Requirements
- The app can be built and modified on any version of Mac or Windows that is supported by Steroids.
- The last version of Steroids that we ran our app with was v4.1.21
- We did all of our testing for the app on iOS 8 and 9

###Known Issues
- When running the app on a phone that is connected via LTE (as opposed to wifi) there can be a slight delay in uploading photos to the database.
- If two users are on the same page and one user tries to add an item, the other user can click refresh icon to view the newly added item. As of now, there is no automatic refresh included
- If multiple users try to commit to the same item simultaneously, there is no assurance as to which one will go through to the database. Sometimes the database will receive a null value in this case



###Developers

* Brendan Frick
* Nathan Yeazel
* Neha Rathi
* Sujana Perumal


#####Special thanks to Professor Chris Riesbeck ,Our Instructor who has 
