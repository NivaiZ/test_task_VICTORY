export default function loadDataFunction() {
	// Загрузка данных из JSON-файла
	fetch('auto.json')
		.then(response => response.json())
		.then(data => {
			const brands = data.brands
			const models = data.models
			const generation = data.generation

			// Функция для обновления списка марок
			function updateBrandsList(event) {
				const clickedButton = event.target.closest('[data-button="brand"]')
				if (!clickedButton) return // Выходим, если клик не был по кнопке
				const modalButtons = document.querySelectorAll('.modal__button')
				modalButtons.forEach(button =>
					button.classList.remove('modal__button-active')
				)

				// Проверяем, была ли нажата та же кнопка data-button="brand"
				const isActiveBrandButton = clickedButton.classList.contains(
					'modal__button-active'
				)

				// Если нажата другая кнопка data-button="brand", устанавливаем активный класс
				if (!isActiveBrandButton) {
					clickedButton.classList.add('modal__button-active')

					// Удаляем активный класс у кнопки data-button="model"
					const activeModelButton = document.querySelector(
						'.modal__button.modal__button-active[data-button="model"]'
					)
					if (activeModelButton) {
						activeModelButton.classList.remove('modal__button-active')
					}
				}
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
						updateActiveButton(
							document.querySelector('.modal__button[data-button="model"]')
						) // Устанавливаем активный класс для кнопки модели
					}

					modalData.appendChild(brandLi)
				})
			}

			// Функция для обновления списка моделей
			function updateModelsList(brand) {
				const modalData = document.querySelector('.modal__data')
				const modalGeneration = document.querySelector('.modal__generation')
				modalData.innerHTML = '' // Очищаем текущие данные
				modalGeneration.innerHTML = '' // Очищаем текущие данные

				models[brand].forEach(model => {
					const modelDiv = document.createElement('li')
					modelDiv.className = 'modal__model'

					const modelSpan = document.createElement('span')
					modelSpan.textContent = model

					const generationQuantitySpan = document.createElement('span')
					generationQuantitySpan.classList.add('modal__brand-quantity')
					generationQuantitySpan.textContent = ` ${
						generation[brand] && generation[brand].length
							? generation[brand].length
							: 0
					}`

					modelDiv.appendChild(modelSpan)
					modelDiv.appendChild(generationQuantitySpan)

					modelDiv.addEventListener('click', function() {
						displayGenerations(brand, model) // Отображаем поколения при клике на модель

						const activeModelButton = document.querySelector(
							'.modal__button.modal__button-active[data-button="model"]'
						)
						if (activeModelButton) {
							activeModelButton.classList.remove('modal__button-active') // Снимаем активный класс с предыдущей кнопки
						}
						const activeGenerationButton = document.querySelector(
							'.modal__button.modal__button-active[data-button="generation"]'
						)
						if (activeGenerationButton) {
							activeGenerationButton.classList.remove('modal__button-active') // Снимаем активный класс с кнопки "Поколение"
						}
						document
							.querySelector('.modal__button[data-button="generation"]')
							.classList.add('modal__button-active') // Активируем кнопку "Поколение"
						modalData.style.display = 'none' // Скрываем список моделей
					})

					modalData.appendChild(modelDiv)
				})

				// Добавляем обработчик клика на кнопку "Модель", чтобы показать снова список моделей
				const modelButton = document.querySelector(
					'.modal__button[data-button="model"]'
				)
				modelButton.addEventListener('click', function() {
					modalData.style.display = 'grid' // Показываем список моделей
					const activeButton = document.querySelector(
						'.modal__button.modal__button-active[data-button="model"]'
					)
					if (activeButton) {
						activeButton.classList.remove('modal__button-active') // Снимаем активный класс с предыдущей кнопки
					}
				})
			}

			function displayGenerations(brandName) {
				const modalGeneration = document.querySelector('.modal__generation')
				modalGeneration.innerHTML = '' // Очищаем текущие данные

				if (generation[brandName] && generation[brandName].length > 0) {
					const generations = generation[brandName]
					generations.forEach(gen => {
						const genDiv = document.createElement('li')
						genDiv.classList.add('modal__generation-list')
						const genSpan = document.createElement('span')
						const modelCountSpan = document.createElement('span')
						modelCountSpan.classList.add('modal__brand-quantity')
						genSpan.textContent = gen
						modelCountSpan.textContent = ` ${
							models[brandName] ? models[brandName].length : 0
						}`
						genDiv.appendChild(genSpan)
						genDiv.appendChild(modelCountSpan)
						modalGeneration.appendChild(genDiv)
						genDiv.addEventListener('click', function() {
							displaySelectedGeneration(gen)
							const activeCarButton = document.querySelector(
								'.modal__button.modal__button-active[data-button="car"]'
							)
							if (activeCarButton) {
								activeCarButton.classList.remove('modal__button-active') // Снимаем активный класс с предыдущей кнопки
							}
							const activeGenerationButton = document.querySelector(
								'.modal__button.modal__button-active[data-button="generation"]'
							)
							if (activeGenerationButton) {
								activeGenerationButton.classList.remove('modal__button-active') // Снимаем активный класс с кнопки "Поколение"
							}
							document
								.querySelector('.modal__button[data-button="car"]')
								.classList.add('modal__button-active') // Активируем кнопку "Автомобиль"
							modalGeneration.style.display = 'none' // Скрываем список поколений
						})
					})
				} else {
					const noGenerationDiv = document.createElement('li')
					const noGenerationSpan = document.createElement('span')
					noGenerationSpan.textContent =
						'Нет информации о поколениях для данной марки.'
					noGenerationDiv.appendChild(noGenerationSpan)
					modalGeneration.appendChild(noGenerationDiv)
				}
			}
			document
				.querySelectorAll('.modal__generation-list')
				.forEach(genListItem => {
					genListItem.addEventListener('click', function() {
						const modalGeneration = document.querySelector('.modal__generation')
						modalGeneration.style.display = 'none' // Скрываем список поколений
					})
				})

			function displaySelectedGeneration(gen) {
				const selectedGenerationList = document.querySelector(
					'.modal__selection-list'
				)
				selectedGenerationList.innerHTML = '' // Очищаем текущие данные

				// Создаем отдельные div для изображения и остального контента
				const imageDiv = document.createElement('div')
				const contentDiv = document.createElement('div')

				// Создаем HTML-элементы для отображения данных из раздела card
				const cardLogo = document.createElement('img')
				const cardName = document.createElement('span')
				const cardYear = document.createElement('span')
				const cardV = document.createElement('span')
				const cardLS = document.createElement('span')

				// Получаем данные из раздела card вашего JSON
				const cardData = data.card

				// Устанавливаем значения атрибутов и текстовое содержимое для созданных элементов
				cardLogo.src = `img/${cardData.logo}`
				cardName.textContent = cardData.name
				cardYear.textContent = `Year: ${cardData.year}`
				cardV.textContent = `V: ${cardData.v}`
				cardLS.textContent = `LS: ${cardData.ls}`

				// Добавляем изображение в отдельный div
				imageDiv.appendChild(cardLogo)

				// Добавляем остальной контент в отдельный div
				contentDiv.appendChild(cardName)
				contentDiv.appendChild(cardYear)
				contentDiv.appendChild(cardV)
				contentDiv.appendChild(cardLS)

				// Добавляем созданные div в контейнер для отображения данных
				selectedGenerationList.appendChild(imageDiv)
				selectedGenerationList.appendChild(contentDiv)
			}

			// Функция для обновления активного состояния кнопки
			function updateActiveButton(clickedButton) {
				const activeBrandButton = document.querySelector(
					'.modal__button.modal__button-active[data-button="brand"]'
				)
				if (activeBrandButton) {
					activeBrandButton.classList.remove('modal__button-active') // Снимаем активный класс с предыдущей кнопки с data-button="brand"
				}
				if (clickedButton) {
					clickedButton.classList.add('modal__button-active') // Добавляем активный класс к кнопке с data-button="model"
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
