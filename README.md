# rpimidi
Cloud Keys, 2019 Hackathon winner
# What is it?
Cloud Keys is a realtime streaming service that interfaces with MIDI keyboards. Simply put, you can watch someone remotely as they play notes, and play back sessions that have been previously played. It uses Node.js libraries like socket.io (allows realtime relay of notes) and express.js (to serve files from previous sessions).
# How do I run it?
You need to have npm and python 2.7 installed for this to work. Then, run the following commands to start up the server on `localhost:3000`.
```
git clone https://github.com/luketrenaman/rpimidi.git
cd rpimidi
npm i --python=python2.7
node index.js
```
You can then navigate to `localhost:3000` to view the website, and attach a electric piano via midi cable to enable the realtime features of the website.
