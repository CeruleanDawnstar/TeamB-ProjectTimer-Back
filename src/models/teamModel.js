const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const timestamps = require('mongoose-timestamps')

const teamSchema = new Schema(
	{
		name: {
			type: String
		},
		createdBy: {
			type: String
		},
		description: {
			type: String,
			required: true
		},
		id_project: {
			type: String,

		}
	},
	{ timestamps: true }
);

//teamSchema.plugin(timestamps);

module.exports = mongoose.model('Team', teamSchema);