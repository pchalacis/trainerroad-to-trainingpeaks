# trainerroad-to-trainingpeaks
This code allows you to copy trainer road workout into your training peaks account.

## Step by step instructions:
1. login to your Trainer Road account, and open the workout. example: https://www.trainerroad.com/cycling/workouts/20725-bald-knob
2. If you're viewing triathlon plan, you have to open weekly tips for every week (just click on week tips for each week).
3. Open https://raw.githubusercontent.com/pchalacis/trainerroad-to-trainingpeaks/master/minimised/trainerroad.js file and copy it's content. 
4. On your Trainer Road window, open javascript console (for eaxample, for Chrome view -> developer -> javascript console).
5. In the console, paste content of the file from step 3.
5a. enter your workout library ID from Training Peaks
7. Login to your Training Peaks account
8. Open javascript console and paste what you have in the clipboard
9. done.

#how to get library ID from Training Peaks:
1. login to training peaks
2. open javascript console
3. switch to "network" tab"
4. open your workout library
5. add any workout to the library you want to use for the imports
6. in the network tab of the javascript console new row will appear (it will be named "items") and the url will look like https://tpapi.trainingpeaks.com/exerciselibrary/v1/libraries/XXXXX/items. The XXXXX is your library ID





# few notes
1. You need premium Training Peaks account, or at least the initial 7 days trial to be able to put workouts in the future
2. Script creates workout with the power profile, but ignores slopes
3. Script ignores any notes
6. If you don't trust javascript code, don't use it. There is no phishing and the source is available in /source. 
7. I take no responsibility for hte script. use at will.
8. No, I will not post Trainer Road plans here, this script is to make your life easier if you use both, not to get yourself a free training plan.

# Bugs and feature requests
1. Sorry, works for me, use at will. Found a bug? Create a pull request. Feature request? Make it yourself, I'm busy training ;)
2. Code was tested on 2 TP accounts, under Chrome.
