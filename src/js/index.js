// Галерея и лайтбоксы от Fancybox
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import calculateInitialPayment from './modules/calculateInitialPayment'
import countdownTimer from './modules/countdownTimer'
import loanDuration from './modules/loanDuration'
import maskPhoneFunction from './modules/maskPhoneFunction'

Fancybox.bind('[data-fancybox]', {
	// Your custom options
})
function handleDOMContentLoaded() {
	loanDuration()
	calculateInitialPayment()
	countdownTimer()
	maskPhoneFunction()
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
