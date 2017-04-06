module.exports = (mongoose) => {
	const Q = require('q');

	const Schema = mongoose.Schema;
	const publicOccupationSchema = new Schema({
		stateabbrv: {type: String, required: true},
		areaname: {type: String, required: true},
		occcode: {type: Number, required: true},
		codetitle: {type: String, required: true},
		ratetype: {type: Number, required: true},
		ratetydesc: {type: String},
		empcount: {type: Number},
		mean: {type: Number, required: true},
		median: {type: Number},
		pct10: {type: Number},
		pct25: {type: Number},
		pct75: {type: Number},
		pct90: {type: Number},
		periodyear: {type: String},
		area: {type: String}
	});

	const publicOccupationModel = mongoose.model('publicOccupation', publicOccupationSchema);

	class PublicOccupation {
		constructor(stateabbrv, areaname, occcode, codetitle, ratetype,
					ratetydesc, empcount, mean, median,
					pct10, pct25, pct75, pct90, periodyear, area) {
			this.stateabbrv = stateabbrv;
			this.areaname = areaname;
			this.occcode = occcode;
			this.codetitle = codetitle;
			this.ratetype = ratetype;
			this.ratetydesc = ratetydesc;
			this.empcount = empcount;
			this.mean = mean;
			this.median = median;
			this.pct10 = pct10;
			this.pct25 = pct25;
			this.pct75 = pct75;
			this.pct90 = pct90;
			this.periodyear = periodyear;
			this.area = area;

		}

		async save() {
			let d = Q.defer();
			let publicOccupation = new publicOccupationModel(this);
			try {
				let save = publicOccupation.save();
				d.resolve(save);
			}
			catch (e) {
				console.log("Failed to insert public occupation into the database");
				d.reject("Error: /models/PublicOccupation.js - save(): " + e);
			}

			return d.promise;
		}

	}

	PublicOccupation.All = async (obj) => {
		try {
			let publicOccupations = await publicOccupationModel.find(obj);
			return publicOccupations;
		}
		catch (e) {
			console.log("Failed to get occupations : " + e);
		}

	};

	PublicOccupation.Find = async (obj) => {
		try {
			let occupations = await publicOccupationModel.findOne(obj);
			return occupations;
		}
		catch (e) {
			console.log("Failed to get an occupation : " + e);
		}
	};

	PublicOccupation.Delete = (obj) => {
		let d = Q.defer();
		try {
			let remove = publicOccupationModel.findOneAndRemove({_id: obj.id});
			d.resolve(remove);
		}
		catch (e) {
			console.log("Failed to delete a public occupation: " + e)
			d.reject("Error: /models/PublicOccupation.js - PublicOccupation.Delete(): " + e)
		}

		return d.promise;
	}

	return PublicOccupation;
}