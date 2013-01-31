function setDefaults(obj) {
	window.slider_defaults = {
		min: obj.min,
		max: obj.max,
		correct: obj.correct,
		exponent: obj.exponent,
		slider_element: obj.slider_element,
		input_element: obj.input_element,
		correct_element: obj.correct_element,
		fill_element: obj.fill_element,
		bar_width: obj.bar_width,
		slider_width: obj.slider_width,
		left_margin: obj.left_margin,
		disabled: false
	};
}

function defaultSliderPosition() {
	var position = (window.slider_defaults.bar_width / 2) + window.slider_defaults.left_margin + (0.5 * window.slider_defaults.slider_width);
	moveSlider(position, window.slider_defaults.slider_element);
}

function bindSliderEvent(type, element) {
	$(document).on(type, function(event) {
		if (type === 'touchmove') {
			moveSlider(event.originalEvent.touches[0].pageX, element);
		} else {
			moveSlider(event.pageX, element);
		}
	});
}

function bindInputEvent(type) {
	$(document).on(type, function(event) {
		var input = $(window.slider_defaults.input_element).val();

		if (window.slider_defaults.min % 1 !== 0 || window.slider_defaults.correct % 1 !== 0) {
			input = parseFloat(input);
		} else {
			input = removeCommas(input);
		}
		
		if (!isNaN(input) && !outOfBounds(input)) {
			moveSliderFromInput(input, window.slider_defaults.slider_element);
		}
	});
}

function unbindEvent(type) {
	$(document).off(type);
}

function moveSlider(event_x, element) {
	var position = getSliderPosition(event_x);
	
	if (!outOfBounds(position)) {
		setSliderPosition(event_x, element);
		if ($(element).attr('id') === $(window.slider_defaults.slider_element).attr('id')) {
			setInputField(position);
		}
	}
}

function moveSliderFromInput(input, element) {
	$(element).css('left', roundValue(getInputField(removeCommas(input))));
	
	if ($(element).attr('id') === $(window.slider_defaults.slider_element).attr('id')) {
		highlightFill();
	}
}

function outOfBounds(position) {
	if (position >= window.slider_defaults.min && position <= window.slider_defaults.max) {
		return false;
	} else {
		return true;
	}
}

function getSliderPosition(event_x) {
	if (window.slider_defaults.exponent) {
		return getExponentialPosition(event_x);
	} else {
		return getLinearPosition(event_x);
	}
}

function setSliderPosition(event_x, element) {
	$(element).css('left', Math.round((event_x - window.slider_defaults.left_margin) - window.slider_defaults.slider_width) + 'px');
	
	if ($(element).attr('id') === $(window.slider_defaults.slider_element).attr('id')) {
		highlightFill();
	}
}

function getInputField(input) {
	if (window.slider_defaults.exponent) {
		return getExponentialInput(input);
	} else {
		return getLinearInput(input);
	}
}

function setInputField(position) {
	$(window.slider_defaults.input_element).val(roundValue(position));
}

function getExponentialPosition(event_x) {
	var min = window.slider_defaults.min,
		max = window.slider_defaults.max,
		exponent = window.slider_defaults.exponent,
		bar_width = window.slider_defaults.bar_width,
		slider_width = window.slider_defaults.slider_width,
		margin = window.slider_defaults.left_margin;
	
	if (min === 0) {
		min = 1;
	}
	
	return min * Math.pow(Math.pow((max / min), (1 / exponent)), (exponent * (((event_x - margin) - (0.5 * slider_width)) / bar_width)));
	
}

function getExponentialInput(input) {
	var min = window.slider_defaults.min,
		max = window.slider_defaults.max,
		exponent = window.slider_defaults.exponent,
		bar_width = window.slider_defaults.bar_width,
		slider_width = window.slider_defaults.slider_width,
		margin = window.slider_defaults.left_margin;
	
	if (min === 0) {
		min = 1;
	}
	
	return ((Math.log((input / min)) * bar_width) / (Math.log(Math.pow((max / min), (1 / exponent))) * exponent)) - (0.5 * slider_width);
}

function getLinearPosition(event_x) {
	var min = window.slider_defaults.min,
		max = window.slider_defaults.max,
		bar_width = window.slider_defaults.bar_width,
		slider_width = window.slider_defaults.slider_width,
		margin = window.slider_defaults.left_margin;
	
	return (((event_x - margin) - (0.5 * slider_width)) * ((max - min) / bar_width)) + min;
}

function getLinearInput(input) {
	var min = window.slider_defaults.min,
		max = window.slider_defaults.max,
		bar_width = window.slider_defaults.bar_width,
		slider_width = window.slider_defaults.slider_width,
		margin = window.slider_defaults.left_margin;
		
	return (input / ((max - min) / bar_width)) - (0.5 * slider_width);
}

function highlightFill() {
	$(window.slider_defaults.fill_element).css('width', parseInt($(window.slider_defaults.slider_element).css('left')) + Math.round(window.slider_defaults.slider_width * 0.5) + 'px');
}

function getScore(element) {
	return Math.round((Math.abs(parseInt($(element).css('left')) - parseInt($(window.slider_defaults.correct_element).css('left'))) / window.slider_defaults.bar_width) * 100);
}

function roundValue(val) {
	if (window.slider_defaults.min % 1 !== 0 || window.slider_defaults.correct % 1 !== 0) {
		if (((window.slider_defaults.correct % 1) * 10) % 1 === 0) {
			return Math.floor(val * 10) / 10;
		} else {
			return Math.floor(val * 100) / 100;
		}
	} else {
		return this.addCommas(Math.round(val));
	}
}

function addCommas(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

function removeCommas(val) {
	return parseInt(String(val).replace(/\,/g,''));
}



