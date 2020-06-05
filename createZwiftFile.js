var url = "https://www.trainerroad.com/api/workoutdetails/" + document.location.href.split('/').pop().split('-')[0]



function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


fetch(url, {credentials: "include"}).then(res => res.json())
.then(function (json) {
		

	var structure = [],
		end = 0;

		testInterval = false;


		var intervalData = json.Workout.intervalData;

	for (var i = 1; i < intervalData.length; i++) {
		if (intervalData[i].TestInterval) {
			testInterval = intervalData[i];
			break;
		}
	}

	for (var i = 1; i < intervalData.length; i++) {
		if (testInterval && testInterval.Name !== intervalData[i].Name) {
			if (intervalData[i].Start >= testInterval.Start && 
				intervalData[i].End <= testInterval.End) {
				continue;
			}
		}



		var ic = 'warmUp';
		if (i == 1) { ic = 'warmUp'; }
		else if (i === intervalData.length) { ic = 'coolDown' }
		else if (intervalData[i].StartTargetPowerPercent > 60) { ic = 'active'; } 	
		else { ic = 'rest'; }

	//	console.log(intervalData[i]);

		if (intervalData[i].Name === 'Fake' && i === 1) {
			intervalData[i].Name = 'Warm up';
		} else if (intervalData[i].Name === 'Fake') {
			intervalData[i].Name = 'Recovery';
		}

		end = intervalData[i].End;

		structure.push ({"name":intervalData[i].Name, "length": intervalData[i].End - intervalData[i].Start, "target": intervalData[i].StartTargetPowerPercent, "begin":intervalData[i].Start, "end":intervalData[i].End }); 

	}
	var duration = parseInt(json.Workout.Details.Duration)/60;
	var description = json.Workout.Details.WorkoutDescription + "\n\n" +json.Workout.Details.GoalDescription;

	description += "\n\nhttps://www.trainerroad.com/cycling/workouts/" + json.Workout.Details.Id;


	var workoutData = {
		name: json.Workout.Details.WorkoutName,
		description: description,
		workout: structure
	}



	var out = `<workout_file>
	<author>TrainerRoad</author>
	<name>` + workoutData.name + `</name>
	<description><![CDATA[` + workoutData.description + `]]></description>
	<sportType>bike</sportType>
	<tags/>
	<workout>`;

	
	for (var i in structure) {
		if (structure[i].name === 'Warm up') {
			out += '<Warmup Duration="' + structure[i].length + '" PowerHigh="' + (structure[i].target/100) + '" PowerLow="0.4"></Warmup>' + "\n";
		} else {
			out += '<SteadyState Duration="' + structure[i].length + '" Power="' + (structure[i].target/100) + '"></SteadyState>' + "\n";
		}
		powerLow = structure[i].target;
	}

		out += `</workout>
	</workout_file>`
	download(workoutData.name + '.zwo', out)
})