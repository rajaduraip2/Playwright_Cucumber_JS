#This Line specifies the base image of the docker container. 
#This one will get keep on updated in playwright website gtheyr you can see the latest version
FROM mcr.microsoft.com/playwright:v1.48.1-noble


# This step specifies the working directory inside the container
WORKDIR /repo

# This steps ensure copy the package-lock json from local to /repodirectory in the container.
COPY ["package-lock.json","./"] 

#This sets the ENV Headless variable to true. So, The Automated test will get executed in Headless
ENV HEADLESS=true

# Manually installing the playwright package in order to install the system dependencies which playwright needs
#First command will make sure same dependency which are mentioned in package-lock.json is getting downloaded and 
#not creating new package.-lock.json file.

#--no-save ->>> makes sure that newly installed dependency not getting saved into package.json/package-lock.jspon file.

#playwright@$() makes sure that same version of dependency getting installed

#node -pe >>>>>>>>>>>>> runs a Node.js command in a quick,one-liner format.

#"require('./package-lock.json').dependencies.playwright.version"  >>> this is a JS expression that require the package-lock.json file 
#and get the dependecies and playwright object and Retreived the version of the Playwright dependency.

# general command to execute the all mandatory dependency for playwright.
RUN npm install --no-package-lock --no-save playwright@$(node -pe "require('./package-lock.json').dependencies.playwright.version") && \
    npx playwright install-deps


# Install remaining node packages
COPY ["package.json", "./"]
RUN npm install && rm -rf /var/lib/apt/lists/*

COPY . .


# Docker command to build image- "docker build -t playwright_cucumber_js ."
#You should be in root directory

#docker run -it playwright_cucumber_js to start a container
#then you will get into the container shell thetre you can use the regular execution command. 