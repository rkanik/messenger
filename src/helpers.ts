import { mse } from './enums'

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

const getPairs = (arr: any[]): any[][] => {
	let start = 0, pairs = []
	while (start < (arr.length - 1)) {
		pairs.push([arr[start], arr[start + 1]])
		start += 1
	}
	return pairs
}

const units = [
	['second', 1000],
	['minute', 60000],
	['hour', 3600000],
	['day', 86400000],
	['month', 2592000000],
	['year', 31536000000],
]

const unitMsPairs = getPairs(units)

export const howAgo = (time: string) => {
	const diff = Date.now() - new Date(time).getTime();
	const pair = unitMsPairs
		.filter((e: [string, number][]) => diff >= e[0][1] && diff < e[1][1])
		.reduce((e: number[], o: number[]) => e.concat(o), []);
	if (pair.length) {
		if (diff < 2 * pair[0][1]) return `1 ${pair[0][0]} ago`;
		if (diff < pair[1][1]) return `${Math.floor(diff / pair[0][1])} ${pair[0][0]}s ago`;
	}
	return diff < mse.second
		? 'Less than a second ago'
		: diff < 2 * mse.year
			? '1 year ago'
			: `${Math.floor(diff / mse.year)} years ago`;
};

export const groupify = (
	array: any[],
	key: string,
	groupKey: string = 'items',
	others: any[] = []
): any[] => {
	if (!array.length) return array
	const result = array.reduce(({ prev, group }, element) => {

		const isSame = prev === element[key]
		const isEmpty = !group.length

		if (!isSame) prev = element[key]

		if ((isSame && isEmpty) || !isSame) {
			let groupItem = { [groupKey]: [element] }
			others.forEach(k => {
				if (typeof k === 'string') groupItem[k] = element[k]
				else {
					let akey = Object.keys(k)[0]
					// @ts-ignore
					groupItem[akey] = k[akey](element[akey])
				}
			})
			group.push(groupItem)
		}
		else {
			const lastIndex = group.length - 1
			group[lastIndex][groupKey].push(element)
			others.forEach(k => {
				if (typeof k === 'string') group[lastIndex][k] = element[k]
				else {
					let akey = Object.keys(k)[0]
					// @ts-ignore
					group[lastIndex][akey] = k[akey](element[akey])
				}
			})
		}
		return { prev, group }
	},
		{ prev: array[0][key], group: [] }
	)
	return result.group
}