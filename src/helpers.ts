export const classify = (classes: any): string => {
	if (typeof classes === 'string') return classes
	classes = Array.isArray(classes)
		? classes.map(cls => classify(cls))
		: Object.keys(classes).filter((key: string) => classes[key])
	return classes.join(' ').trim()
}

export const random = (max: number, min = 0) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const letter = () => {
	return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[random(26)]
}

export const miniId = (len = 10) => {
	return Math.random().toString(36).slice(-len)
}