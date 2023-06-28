export default {
	groupsToString: (groups: any[]) => {
		var desc = ""
		for (let i = 0; i < groups.length; i++) {
			const group = groups[i];
			if(i != groups.length-1){
				desc = desc + group.group.name + ", "
			} else {
				desc = desc + group.group.name
			}
		}
		return desc
	},
	/**
	 * Rounds the currency value to 2 digits
	 *
	 * @public
	 * @param {string} value value to be formatted
	 * @returns {string} formatted currency value with 2 digits
	 */
	formatValue: (value:string) => {
		if (!value) {
			return "";
		}
		try {
			return parseFloat(value).toFixed(2);
		} catch (error) {
			return value;
		}
	},

	formatTargetType: (targetType: any) => {
		if(targetType == "group"){
			return false
		} else {
			return true
		}
	},

	formatListMode: (targetType: any) => {
		if(targetType == "group"){
			return "None"
		} else {
			return "MultiSelect"
		}
	}, 

	countriesToString: (countries: any[]) => {
		var desc = ""
		for (let i = 0; i < countries.length; i++) {
			const country = countries[i];
			if(i != countries.length-1){
				desc = desc + country.country.name + ", "
			} else {
				desc = desc + country.country.name
			}
		}
		return desc
	},
}