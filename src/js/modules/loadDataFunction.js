export default function loadDataFunction() {
	// Загрузка данных из JSON-файла
	fetch('auto.json')
		.then(response => response.json())
		.then(data => {
			const brands = data.brands
			const models = data.models

			// Функция для обновления списка марок
			function updateBrandsList(event) {
				const clickedButton = event.target.closest('.modal__button')
				if (!clickedButton) return // Выходим, если клик не был по кнопке
				const modalButtons = document.querySelectorAll('.modal__button')
				modalButtons.forEach(button =>
					button.classList.remove('modal__button-active')
				)
				clickedButton.classList.add('modal__button-active')

				const modalData = document.querySelector('.modal__data')
				modalData.innerHTML = '' // Очищаем текущие данные

				brands.forEach(brand => {
					const brandLi = document.createElement('li')
					const brandContainer = document.createElement('div')
					const brandSpan = document.createElement('span')
					const brandQuantity = document.createElement('span')
					const brandImg = document.createElement('img')

					brandLi.className = 'modal__brand'
					brandContainer.className = 'modal__brand-container'
					brandSpan.className = 'modal__brand-name'
					brandImg.src = `img/${brand.logo}`

					if (models[brand.name] !== undefined) {
						brandQuantity.textContent = ` ${models[brand.name].length}`
					} else {
						brandQuantity.textContent = ' (0)'
					}

					brandQuantity.className = 'modal__brand-quantity'

					brandContainer.appendChild(brandImg)
					brandContainer.appendChild(brandSpan)
					brandLi.appendChild(brandContainer)
					brandLi.appendChild(brandQuantity)
					brandSpan.textContent = brand.name
					brandLi.onclick = function() {
						updateModelsList(brand.name)
					}

					modalData.appendChild(brandLi)
				})
			}

			// Функция для обновления списка моделей
			function updateModelsList(brand) {
				const modalData = document.querySelector('.modal__data')
				modalData.innerHTML = '' // Очищаем текущие данные
				models[brand].forEach(model => {
					const modelDiv = document.createElement('div')
					modelDiv.className = 'modal__model'
					modelDiv.textContent = model
					modelDiv.onclick = function() {
						updateActiveButton() // Устанавливаем активный класс для кнопки
					}
					modalData.appendChild(modelDiv)
				})
			}

			// Функция для обновления активного состояния кнопки
			function updateActiveButton() {
				const activeButton = document.querySelector(
					'.modal__button.modal__button-active'
				)
				if (activeButton) {
					activeButton.classList.remove('modal__button-active') // Снимаем активный класс с предыдущей кнопки
				}
				const modalButton = document.querySelector('.modal__button')
				if (modalButton) {
					modalButton.classList.add('modal__button-active') // Устанавливаем активный класс для кнопки
				}
			}

			// Функция для обновления активного состояния моделей
			function updateActiveModel(activeModel) {
				// Удаляем класс active со всех моделей
				document.querySelectorAll('.model').forEach(modelElement => {
					modelElement.classList.remove('modal__button-active')
				})
				// Добавляем класс active к активной модели
				activeModel.classList.add('modal__button-active')
			}

			// Назначение обработчика клика для кнопки "Марка"
			const modalButtons = document.querySelectorAll('.modal__button')
			modalButtons.forEach(button =>
				button.addEventListener('click', updateBrandsList)
			)

			// Назначение обработчика клика для моделей
			const modelItems = document.querySelectorAll('.model')
			modelItems.forEach(model =>
				model.addEventListener('click', function() {
					updateActiveModel(model)
				})
			)
		})
		.catch(error => console.error('Ошибка загрузки данных:', error))
}
