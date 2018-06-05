export function injectCSS(css) {
	const styleElem = document.createElement('style')
	styleElem.setAttribute('type', 'text/css')
	styleElem.textContent = css
    document.querySelector('head').appendChild(styleElem)
}
