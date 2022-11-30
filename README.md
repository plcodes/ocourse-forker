# Orienteering Relay Forker

This is a tool to help orienteering course setters to automatically create orienteering relay courses from control codes and relay variants.
Live version is available in GitHub Pages https://plcodes.github.io/ocourse-forker/

## Security

The code is pure javascript and runs in the users browser. No data is sent or stored anywhere and the page
doesn't include any 3rd party tracking scripts.

## Background

The amount of needed data handling in orienteering relays, especially the Jukola relay is quite huge. 
Typically the data is handled in excel files and includes lots of manual steps.
Simo Martomaa was one of the course setters in Jukola 2017 and stopped to think of this problem. 
He created a small program to create the needed files automatically. 
Simo was kind enough to give me the codes to be used for Jukola 2019. 
A big kudos to Simo!

The code was written in Clojure and I modified it to my use back in 2018/2019. 
Couple of years passed and I needed the tool again. I didn't have a ready Clojure-environment on my computer anymore and 
started to think if I should create a simple javascript version and thus an online tool for this. So, I did. 
For my own use and for others to use as well if it helps anyone else. There's anyway lots of work for course setters, 
so hope this takes a bit of the technical burden away.    


## Technical stuff

The code is written in [Vue](https://vuejs.org/) and [Vite](https://vitejs.dev/)

## Running in local environment

If you don't want to use the live version (https://plcodes.github.io/ocourse-forker/) or want to modify this to your own use, here's how to do it.

Download the code
```
git clone https://github.com/plcodes/ocourse-forker.git
```
Install everything (from the project root)
```
npm install
```
Start the develop version in http://localhost:3000/ocourse-forker/ 
```
npm run dev
```
Other useful commands
```
npm run
npm run preview
npm run test
npm run test:ui
```

