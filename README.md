
# Yokel

>Restaurant and bar reviews for locals by locals

## Team

  - __Product Owner__:  Geoffrey Abdallah
  - __Scrum Master__: Jake Gribschaw
  - __Development Team Members__: Stefanie Contreras, Collin Kokotas

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
###Setting up the neo4j server
2. create an azure ubuntu 14.14 server
2. login via ssh using the username and password you provided
2. Update the headers with: sudo apt-get update
2. Install the latest version of open java 7 with: 
sudo apt-get install openjdk-7-jdk
2. Download neo4j with: 
wget http://dist.neo4j.org/neo4j-community-2.1.3-unix.tar.gz
2. Extract the tar ball with: tar -zxvf neo4j-community-2.1.3-unix.tar.gz 
2. Change into the neo4j directory with: cd neo4j-community-2.1.3/
2. Install neo4j as a service using: sudo ./bin/neo4j-installer install
2. Allow the service to create a new user for you 
2. Edit conf/neo4j-server.properties with: 
sudo nano conf/neo4j-server.properties
Change this line:
**\#org.neo4j.server.webserver.address=0.0.0.0**
to this: 
**org.neo4j.server.webserver.address=0.0.0.0**
and close the editor
	Hot tip: you can save and exit nano with ctr+x then hit y and enter
2. Check to see if the service is running with: 
sudo service neo4j-service status 
If the service is not running start it with: 
sudo service neo4j-service start
If the service is running restart it with:
sudo service neo4j-service restart
2. Open your virtual machine in azure web client and navigate to endpoints
2. Add or edit the HTTP endpoint to the following
name: HTTP
protocol: TCP
Public Port: 80
Private Port: 7474
2. Allow the changes to be applied 
2. Navigate to your webserver it will be somthing like websiteName.cloudapp.net
2.You are all set!

###Google API Key
3. Go to [https://console.developers.google.com](https://console.developers.google.com)
3. Login or create an account 
3. Create a new project
3. Click enable API
3. Find Places API and turn it on
3. On the left hand side select credentials
3. Select public API access and create new key choose server key
3. Copy your new API key and export it to your local enviroment
You can do this with:
  **export GOOGLE_API_KEY=yourAPIKeyHere**
3. your key should now be accessable to the server!

###Facebook API Key and Id
4. Go to [https://developers.facebook.com/](https://developers.facebook.com/)
4. Log in and accept the developer agreement
4. Once your loged in on the top bar click the Apps drop down and select create new app
4. Select www to create a web based app
4. Under catagory choose food & drink and create the app
4. On the next screen click skip quick start
4. This will take you to the apps dash board here you will see the app id and app secret
4. you should save these keys just like the google api key
  **export FACEBOOK_CLIENT_ID=facebookAppId**
  **export FACEBOOK_CLIENT_SECRET=facebookAppSecret**
4. Now we need to set the callback urls that your app will accept 
4. Click settings on the right hand side of the screen
4. Then click Advanced 
4. Under security there is a field called Valid OAuth redirect URIs in here you want to add your callback url
  * During development on a local computer set the field to: http://localhost:9000/auth/facebook/callback
  * During production add your website url like this: http://MYWEBSITEHERE/auth/facebook/callback
4. You need to now save this callback on your computer:
  **export FACEBOOK_CALLBACK_URL=theURLThatYouSetInTheFacebookValidRedirects**
## Requirements



- Node 0.10.x
- Angular
- Express
- Neo4j

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


