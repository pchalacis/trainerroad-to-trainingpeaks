(function exporter() {
	var plan = {},
		weekElement,
		i = 1,

		days = {
			'mon': 'monday',
			'tue': 'tuesday',
			'wed': 'wednesday',
			'thu': 'thursday',
			'fri': 'friday',
			'sat': 'saturday',
			'sun': 'sunday'
		}



	if ($('tr-plan-record-week').length > 0) {
		weekElement = 'tr-plan-record-week';
	} else 	if ($('tr-plan-week').length > 0) {
		weekElement = 'tr-plan-week';
	} else {
		console.log('there page you\'re at has no workouts');
		return 1;
	}



	$(weekElement).each(function (row) {
		$(this).find('div.td').each(function (bikeday) {
			if ($(this).hasClass('week-info') || $(this).hasClass('empty')) {
				return true;
			} 

			if (plan[i] === undefined) {
				plan[i] = {};
			}

			if (plan[i][days[$(this).prop('class').replace('td ', '')]] === undefined) {
				plan[i][days[$(this).prop('class').replace('td ', '')]] = [];
			}


			plan[i][days[$(this).prop('class').replace('td ', '')]].push({
				'type': 'bike',
				'title': $(this).find('.plan-workout-info h4').text(),
				'description': 'url: ' + $(this).find('.plan-workout-info h4 a').prop('href'),
				'duration': $($(this).find('.plan-workout-info div div:nth-child(1) span.data-group__stat')[0]).text(),
				'tss': $($(this).find('.plan-workout-info div div:nth-child(2) span.data-group__stat')[0]).text(),
				'if': $($(this).find('.plan-workout-info div tr-intensity-stat div.data-group__stat.ng-star-inserted')[0]).text().replace(/[ \n]/g, '')
			})
		});

		/*extra workouts outside of bike + tips */
		$(this).find('.plan-day').each(function (day) {
			
			if (plan[i][$(this).find('em').html().toLowerCase()] === undefined) {
				plan[i][$(this).find('em').html().toLowerCase()] = [];
			}

			if ($(this).prop('class').replace('plan-day ', '') === 'bike') {

				for (var j in plan[i][$(this).find('em').html().toLowerCase()]) {
					if (plan[i][$(this).find('em').html().toLowerCase()][j].type === 'bike') {
						plan[i][$(this).find('em').html().toLowerCase()][j].description += "\n\n" + $(this).find('span').text().replace($(this).find('span strong').html(), '')
						break;
					} 
				}
			} else {
				var tss = 60;
				if ($(this).prop('class').replace('plan-day ', '') === 'run' || $(this).prop('class').replace('plan-day ', '') === 'brick') {
					if ($(this).find('span strong').html().indexOf('Recovery') !== -1 || $(this).find('span strong').html().indexOf('30min Base') !== -1 || $(this).find('span strong').html().indexOf('Transition') !== -1 ) {
						tss = 25;
					} else if ($(this).find('span strong').html().indexOf('Long') !== -1) {
						tss = 120;
					}

					tss = tss + tss*i/100
				} else if ($(this).prop('class').replace('plan-day ', '') === 'swim') {
					tss = 20 * $(this).find('span strong').html().match(/\((.*)m\)/)[1]/1000
				}

				plan[i][$(this).find('em').html().toLowerCase()].push(
				{
					'type': $(this).prop('class').replace('plan-day ', ''),
					'title': $(this).find('span strong').html(),
					'tss': Math.round(tss),
					'description': $(this).find('span').text().replace($(this).find('span strong').html(), ''),
				});
			}
		
		});

		i++;

	});

//	console.log(plan);
	console.log('var TRData = ' + JSON.stringify(plan))

})();