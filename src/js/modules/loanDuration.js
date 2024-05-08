import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'

export default function loanDuration() {
	const clickPipsSlider = document.getElementById('form-slider')

	noUiSlider.create(clickPipsSlider, {
		range: {
			min: 2,
			'0%': 2,
			'10%': 6,
			'20%': 12,
			'30%': 24,
			'40%': 36,
			'50%': 48,
			'60%': 60,
			'70%': 72,
			'80%': 84,
			'90%': 96,
			max: 96,
		},
		start: [2],
		snap: true,
		connect: [true, false],
		pips: {
			mode: 'values',
			values: [2, 6, 12, 24, 36, 48, 60, 72, 84, 96],
			density: 4,
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
	function getMonthWord(value) {
		// Определяем последнюю цифру для выбора правильной формы слова
		const lastDigit = value % 10
		const lastTwoDigits = value % 100

		// Проверяем исключения для чисел от 11 до 14
		if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
			return 'месяцев'
		}

		// Возвращаем правильную форму слова в зависимости от последней цифры
		switch (lastDigit) {
			case 1:
				return 'месяц'
			case 2:
			case 3:
			case 4:
				return 'месяца'
			default:
				return 'месяцев'
		}
	}
	const rangeSliderValueElement = document.getElementById('slider-range-value')

	clickPipsSlider.noUiSlider.on('update', function(values, handle) {
		const value = parseInt(values[handle], 10)
		const monthWord = getMonthWord(value)
		rangeSliderValueElement.innerHTML = value + ' ' + monthWord
	})
}
