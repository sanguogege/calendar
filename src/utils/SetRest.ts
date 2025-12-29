import Rest from "../data/rest.json";

const check = (data: any) => {
	var demo = {
		2023: {
			xiu: ["0101"],
			ban: ["0202", "0303"],
		},
	};
	Object.keys(data).forEach(function (e: any) {
		console.log(data);
		if (typeof e == "string") {
			if (!parseInt(e)) {
				console.error(
					"请检查输入的key是否正确:key应为number或者可被转换的string",
					demo
				);
				console.error("当前key为", e);
			}
		}
		if (!data[e].xiu) {
			console.error("请检查输入的休息的key格式是否正确:key应为xiu", demo);
		}
		if (!data[e].ban) {
			console.error("请检查输入的调休的key格式是否正确:ban", demo);
		}
	});
	return Object.assign({}, Rest, data);
}

const RestDay = function (y: number, m: number, d: number, data?: any) {
	var newRest = check(data);
	const day =
		(m < 10 ? "0" + m : m.toString()) + (d < 10 ? "0" + d : d.toString());
	if (newRest[y]) {
		return {
			Xiu: newRest[y].xiu.includes(day),
			Ban: newRest[y].ban.includes(day),
			newRest: newRest,
		};
	} else {
		return {
			Xiu: false,
			Ban: false,
			newRest: newRest,
		};
	}
};

export { RestDay };
