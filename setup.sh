#!/bin/bash

echo "Enter project name:"
read projectName

# Check if project name is empty
if [ -z "$projectName" ]; then
  echo "Project name cannot be empty. Exiting script."
  exit 0
fi

#check if project name exists
if [ -d "../$projectName" ]; then
  echo "Project name already exists. Please choose a different name."
  exit 0
fi

# Create project directory one level up from the root
cd ..
mkdir $projectName
cd $projectName


# Copy files from boilerplate-codes directory to project directory
cp -r ../boilerplate-codes/* .

# Ask for Github repo link
echo "Initializing git repository (optional)..."
git init

echo "Do you want to initialize a new github repositry? (y/n) "
read initGithub
if [ $initGithub = "y" ]; then
        echo "Enter GitHub repository URL (optional):"
        read githubUrl

        if [ -n "$githubUrl" ]; then
        git remote add origin $githubUrl
        else
        echo "Skipping GitHub remote setup."
        fi
    else
    echo "Skipping GitHub remote setup."
fi

#creating .env
touch ../$projectName/.env

# Ask for port number to run server
read -p "Enter port number to run server: " port

#adding port to .env
if [ ! $port = "" ]; then
    #adding port to .env
    echo "PORT=$port" >> ../$projectName/.env
else
    echo "PORT=8000" >> ../$projectName/.env
fi

# Ask for JWT secret key
read -p "Enter JWT secret key: " jwtKey

#adding jwt key to .env
if [ ! $jwtKey = "" ]; then
    #adding port to .env
    echo "JWT_SECRETKEY=$jwtKey" >> ../$projectName/.env
else
    echo "JWT_SECRETKEY=mysecretkey" >> ../$projectName/.env
fi

# Ask if user wants to use a database
read -p "Do you want to use a database? (y/n): " useDb

if [ "$useDb" = "y" ]; then
    # Ask for database information
    echo "Which database do you want to use? (mongodb/mysql/pgsql)"
    read dbType

   if [ $dbType == "mysql" ] || [ $dbType == "pgsql" ]; then
    echo "Enter database username:"
    read dbUsername
    echo "Enter database password:"
    read dbPassword
    echo "Enter database name:"
    read dbName
    if [ $dbType == "mysql" ]; then
        echo "Do you want to use sequelize ORM? (y/n)"
        read useSequelize
        if [ $useSequelize == "y" ]; then
            npm install --save sequelize mysql2
        fi
    elif [ $dbType == "pgsql" ]; then
        echo "Do you want to use sequelize ORM? (y/n)"
        read useSequelize
        if [ $useSequelize == "y" ]; then
            npm install --save sequelize pg pg-hstore
        fi
    fi
   elif [ $dbType == "mongodb" ]; then
     echo "Which MongoDB driver do you want to use? (mongoose/mongoclient)"
    read mongoDriver

    if [ $mongoDriver = "mongoose" ]; then
        npm install mongoose
    elif [ $mongoDriver = "mongoclient" ]; then
        npm install mongodb
    else
        echo "Invalid choice. Skipping MongoDB driver installation."
    fi
  fi
fi