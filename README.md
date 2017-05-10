# trainerroad-to-trainingpeaks
This code allows you to copy trainer road training plan into your training peaks account.

## Step by step instructions:
1. login to your Trainer Road account, and open the plan. (Go to training plans, select phase and plan...). 
2. If you're viewing triathlon plan, you have to open weekly tips for every week (just click on week tips for each week).
3. Open (https://raw.githubusercontent.com/pchalacis/trainerroad-to-trainingpeaks/master/minimised/trainerroad.js) this file and copy it's content. 
4. On your Trainer Road window, open javascript console (for eaxample, for Chrome view -> developer -> javascript console).
5. In the console, paste content of the file from step 3.
6. In the output you'll get a blob of text. Select and copy it. 
7. Login to your Training Peaks account
8. Open javascript console and paste what you copied in step 6.
9. 3. Open (https://raw.githubusercontent.com/pchalacis/trainerroad-to-trainingpeaks/master/minimised/trainingpeaks.js) this file and copy it's content. 
10. Paste it to the Training Peaks window console.
11. You will be asked for the date  when you want to start the plan
12. Enter the date, hit ok, wait 10 or 20 seconds and then refresh the page. all workouts should be there.


#few notes
1. Script does estimate TSS for swim and run workouts. That esitmation might be WAY off, but there is no other way to figure it out. It gives real TSS for bike workouts.
2. You need premium Training Peaks account, or at least the initial 7 days trial to be able to put workouts in the future
3. If you mess the date or run the code twice, you will get duplicate workouts.
4. Script does not check if there are any workouts for given day, it just creates the plan
5. If your date is in the past, workouts will be created but won't be matched.
6. If you don't trust javascript code, don't use it. There is no phishing and the source is available in /source. 
7. I take no responsibility if you mess up your plan, use at will.
8. No, I will not post Trainer Road plans here, this script is to make your life easier if you use both, not to get yourself a free training plan.

#Bugs and feature requests
1. Sorry, works for me, use at will. Found a bug? Create a pull request. Feature request? Make it yourself, I'm busy training ;)
