export default function burgerMenu() {
	const burgerButton = document.querySelector('[data-action="click"]')
	const burgerList = document.querySelector('.burger__wrapper')

	if (burgerButton) {
		burgerButton.addEventListener('click', () => {
			burgerButton.classList.toggle('burger__open')
			burgerList.classList.toggle('burger__wrapper--js')
			document.body.classList.toggle('background__linear')
		})
		document.addEventListener('click', handleDocumentClick)
	}
}

function handleDocumentClick(event) {
  const target = event.target;
  const burgerButton = document.querySelector('.burger__button');
  const burgerList = document.querySelector('.burger__wrapper');

  if (!target.closest('.burger__wrapper--js') && !target.closest('.burger__open')) {
    burgerList.classList.remove('burger__wrapper--js');
    burgerButton.classList.remove('burger__open');
		document.body.classList.remove('background__linear')
		console.log('click');
  }
}