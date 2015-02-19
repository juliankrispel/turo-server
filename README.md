This is currently a vagrant build, just because I like things 
contained and reproducable.

To run it make sure you have vagrant and virtualbox installed.

Then do this:

1 - `npm install`
2 - `vagrant up`

That should be it. If you want to restart the server just cancel 
the process and go

1 - `vagrant ssh`
2 - `sudo su`
3 - `cd /vagrant`
4 - `node server/app.js`

To run twitter oauth, you need a consumer key and secret pair, 
copy .config.example.json to .config.json and change the 
appropriate fields.
