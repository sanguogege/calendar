import {lFtv,sFtv} from "../data/festival.json";

const check =(newData: any, old: any)=> {
	Object.keys(newData).forEach(function (e: any) {
		if (Array.isArray(newData[e])) {
			newData[e].forEach((et: any) => {
				if (typeof et !== "string") {
					console.error("节日名称应为String", et);
				}
			}); 
			if (!old.hasOwnProperty(e)) {
				old[e] = newData[e];
			} else {
				const newFes = old[e].concat(newData[e]);
				old[e] = newFes.filter(function (
					item: any,
					index: any,
					array: any
				) {
					return array.indexOf(item) === index;
				});
			}
		} else {
			console.error("节日汇总格式是应为数组", newData);
		}
	});
	return old;
}

const FestivalDay = function (m: number, d: number, data: any, type = true) {
	const day =
		(m < 10 ? "0" + m : m.toString()) + (d < 10 ? "0" + d : d.toString());

	let FDays: any = {};

	if (type) {
		if (data.sFtv) {
			FDays = check(data.sFtv, sFtv);
		} else {
			FDays = sFtv;
		}
	} else {
		if (data.lFtv) {
			FDays = check(data.lFtv, lFtv);
		} else {
			FDays = lFtv;
		}
	}
	if (FDays[day]) {
		return {
			Festival: FDays,
			FDays: FDays[day],
		};
	} else {
		return {
			Festival: FDays,
			FDays: null,
		};
	}
};

export { FestivalDay };
