const config = {
		url: 'http://api.trainerroad.com:80/v1/calendar/ics/4b2515b1-ba8e-4101-87c0-a0376d138b64'
	};
const rp = require('request-promise');


var options = {
	url: 'https://www.trainerroad.com/api/calendar/activities/' + process.argv[2] + ' ?startDate=' + process.argv[3] + '&endDate=' + process.argv[4],
	method: 'get'
}

var out = [];

rp(options).then(function (r) {
	var plan = JSON.parse(r);

	for (var i in plan) {
		var type = 'other';
		if (plan[i].ActivityType === 1) {
			type = 2;
		} else if (plan[i].ActivityType === 3) {
			type = 1;
		} else if (plan[i].ActivityType === 2) {
			type = 3;
		}

		var w = {
			name: plan[i].Name,
			date: plan[i].Date.split('T')[0],
			duration: Math.round(plan[i].Duration/360)/10,
			distance: plan[i].Distance,
			type: type,
			description: plan[i].Notes
		}

		if (plan[i].Activity) {
			w.tss = plan[i].Activity.TSS
			w.if = plan[i].Activity.IntensityFactor/100,
			w.kj = plan[i].Activity.Kj
		}

		out.push(w)
	}

	for (var i in out) {

		console.log(`var data`+i+` = {"athleteId":1061288,"workoutDay":"` + out[i].date + `","workoutId":0,"title":"` + out[i].name + `","workoutTypeValueId":` + out[i].type + `,"description":\`` + out[i].description + `\`,"distancePlanned":` + out[i].distance + `,"totalTimePlanned":` + out[i].duration + `,"tssPlanned":` + out[i].tss + `,"ifPlanned":` + out[i].if + `,"energyPlanned":` + out[i].kj + `}; fetch("https://tpapi.trainingpeaks.com/fitness/v3/athletes/1061288/workouts", {method: 'POST', body: JSON.stringify(data`+i+`), credentials:"include",headers: {'Content-Type': 'application/json'}}).then(res => res.json()).then(console.log);
			`)

	}
}).catch(function(e) {
	console.log(e);
})




