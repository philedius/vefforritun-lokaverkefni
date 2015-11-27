
$( document ).ready(function() {
	$.ajax({
	  'url': 'http://apis.is/tv/ruv',
	  'type': 'GET',
	  'dataType': 'json',
	  'ifModified': true,
	  'success': function(response) {
	  	setupSchedule(response.results);
	  }
	});

	handleChannelSelection();
	handleAnimations();
	
});

function handleAnimations() {
	// Fade in þegar síða loadar
	$('.header').hide().fadeIn(750);
	$('.panel').hide().fadeIn(750);

	// Animation á örvum
	$('.table').on('click', 'tr', function() {
		$(this).find('.glyphicon').delay(200).toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-up');
	});

	// Animation á dropdown takkanum
	$('#channel-selection').on('show.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
	});

	$('#channel-selection').on('hide.bs.dropdown', function(e){
		$(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
	});
}

function setupSchedule(data) {
	$(".table tbody").empty();
	for (var i = 0; i < data.length; i++) {
		var current = data[i];
		var title = current.title;
		var titleStartTime = current.startTime.substring(10, 16);
		var isOn = checkIfOnTV(current);
		var description = getDescription(current);
		var descriptionId = 'descr' + i;
		var content = assembleContentHTML(isOn, descriptionId, titleStartTime, title);
		var contentDescription = assembleContentDescriptionHTML (descriptionId, description);
		appendToTable(content, contentDescription);
	}
}

function checkIfOnTV(data) {
	var timeNow = new Date();
	var startTime = new Date(data.startTime);
	if (timeNow >= startTime) {
		return true;
	} else {
		return false;
	}
}

function getDescription(data) {
	if (data.description !== '') {
		return data.description;
	} else {
		return "Engin lýsing til staðar.";
	}
}

function assembleContentHTML(isOn, descriptionId, titleStartTime, title) {
	if (isOn) {
			$(".label").remove();
			return "<tr data-toggle='collapse' data-target='#" + descriptionId + "'><td>" + titleStartTime + "</td><td>" + title + "<span class='label label-default'>Í gangi núna</span></td><td><button type='button' class='btn btndefault description-arrow'>Sjá meira<span class='glyphicon glyphicon-menu-up' aria-hidden='true'></span></button></td></tr>";
		} else {
			return "<tr data-toggle='collapse' data-target='#" + descriptionId + "'><td>" + titleStartTime + "</td><td>" + title + "</td><td><button type='button' class='btn btndefault description-arrow'>Sjá meira<span class='glyphicon glyphicon-menu-up' aria-hidden='true'></span></button></td></tr>";
		}
}

function assembleContentDescriptionHTML(descriptionId, description) {
		return "<tr><td colspan='3' class='hiddenRow description'><div id='" + descriptionId + "' class='collapse'><p class='description'>" + description + "</p></div></td></tr>";
}

function appendToTable(content, contentDescription) {
	$(".table tbody").append(content);
	$(".table tbody").append(contentDescription);
}

function handleChannelSelection() {
    $("#channel-selection li").click(function() {
		$(".table tbody").empty();
		var content = "<tr><td class='loading-message'>Sæki dagskrá</td><td></td><td></td></tr>";
		$(".table tbody").append(content);
		$("#chosen-channel").text($(this).text());
    	
    	// Sækja gögn í cache
    	var $this = $(this);
    	if (typeof this.ajaxHtml !== 'undefined') {
    		setupSchedule(this.ajaxHtml);
    		return;
    	}

        $.ajax({
	  		'url': 'http://apis.is/tv/' + $(this).attr('id'),
	  		'type': 'GET',
	  		'dataType': 'json',
	  		'success': function(response) {
	  			// Setja gögn í cache
	  			$this[0].ajaxHtml= response.results;
	  			setupSchedule(response.results);
	  		}
		});
	}); 
}