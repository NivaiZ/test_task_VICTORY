import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

export default function calculateInitialPayment() {
	const clickPipsSlider = document.getElementById('form-payment')

	noUiSlider.create(clickPipsSlider, {
		range: {
			min: 0,
			'0%': 0,
			'10%': 10,
			'20%': 20,
			'30%': 30,
			'40%': 40,
			'50%': 50,
			'60%': 60,
			'70%': 70,
			'80%': 80,
			max: 80,
		},
		start: [0],
		snap: true,
		connect: [true, false],
		pips: {
			mode: 'values',
			values: [0, 10, 20, 30, 40, 50, 60, 70, 80],
			density: 4,
			format: {
				to: function(value) {
					return value + '%'
				},
				from: function(value) {
					return Number(value.replace('%', ''))
				},
			},
		},
	})

	const pips = clickPipsSlider.querySelectorAll('.noUi-value')

	function clickOnPip() {
		const value = Number(this.getAttribute('data-value'))
		clickPipsSlider.noUiSlider.set(value)
	}

	for (let i = 0; i < pips.length; i++) {
		pips[i].style.cursor = 'pointer'
		pips[i].addEventListener('click', clickOnPip)
	}
	const rangeSliderValueElement = document.getElementById(
		'slider-range-payment'
	)

	clickPipsSlider.noUiSlider.on('update', function(values, handle) {
		rangeSliderValueElement.innerHTML = parseInt(values[handle], 10) + '₽'
	})
}
