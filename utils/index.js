const Utils = {
	formatDate(locale = 'en', date) {
		const options = { 
			year:  'numeric',
			month: 'long',
			day:   'numeric'
		}
		return new Date(date).toLocaleDateString(locale, options);
	}
}

export default Utils;