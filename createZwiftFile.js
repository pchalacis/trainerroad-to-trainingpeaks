const url = 'https://www.trainerroad.com/api/workoutdetails/' + document.location.href.split('/').pop().split('-')[0]

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

fetch(url, { credentials: "include" }).then(res => res.json())
    .then(function(json) {
        var intervals = json.Workout.intervalData;
        var workoutSeconds = json.Workout.workoutData;

        var mappedIntervals = [];

        for (let i = 1; i < intervals.length; i++) {
            const interval = intervals[i];

            const intervalLength = interval.End - interval.Start;
            const startSecond = interval.Start * 1000;
            const endSecond = interval.End * 1000;

            const workoutElements = workoutSeconds.filter(e => e.seconds >= startSecond && e.seconds < endSecond);

            var firstElement = workoutElements[0];
            var lastElement = workoutElements[workoutElements.length - 1];

            var startFtp = firstElement.ftpPercent / 100;
            var endFtp = lastElement.ftpPercent / 100;

            if (startFtp === endFtp) {
                mappedIntervals.push(`<SteadyState Duration="${intervalLength}" Power="${startFtp}"></SteadyState>`);
            } else if (startFtp < endFtp) {
                mappedIntervals.push(`<Warmup Duration="${intervalLength}" PowerLow="${startFtp}" PowerHigh="${endFtp}"></Warmup>`);
            } else {
                mappedIntervals.push(`<Cooldown Duration="${intervalLength}" PowerLow="${startFtp}" PowerHigh="${endFtp}"></Cooldown>`);
            }
        }

        var description = `${json.Workout.Details.WorkoutDescription}\n\n
${json.Workout.Details.GoalDescription}\n\n
https://www.trainerroad.com/cycling/workouts/${json.Workout.Details.Id}`;

        const file = 
`<workout_file>
    <author>TrainerRoad</author>
    <name>${json.Workout.Details.WorkoutName}</name>
    <description><![CDATA[${description}]]></description>
    <sportType>bike</sportType>
    <tags/>
    <workout>
        ${mappedIntervals.join('\n        ')}
    </workout>
</workout_file>`;

        download(`${json.Workout.Details.WorkoutName}.zwo`, file);
    });
