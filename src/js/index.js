// Галерея и лайтбоксы от Fancybox
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import burgerMenu from './modules/burgerMenu'
import calculateInitialPayment from './modules/calculateInitialPayment'
import countdownTimer from './modules/countdownTimer'
import { useDynamicAdapt } from './modules/dynamic-adapt'
import loadDataFunction from './modules/loadDataFunction'
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
	loadDataFunction()
	useDynamicAdapt("max")
	burgerMenu()
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
