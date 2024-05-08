import IMask from 'imask'

export default function maskPhoneFunction() {
	const inputFieldPhone = document.querySelectorAll('[data-mask="phone"]')
	for (let index = 0; index < inputFieldPhone.length; index++) {
		const element = inputFieldPhone[index]
		const maskOptions = {
			mask: '+{7}(000)000-00-00',
		}
		IMask(element, maskOptions)
	}
}
