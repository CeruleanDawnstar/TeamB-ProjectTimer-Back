const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
//const timestamps = require('mongoose-timestamps')

const teamSchema = mongoose.Schema(
	{
		name: {
			type: String
		},
	    users: {
			type: Array,
			default: []
		},
		description: {
			type: String,
			required: true
		},
		admin: {
			type: ObjectId,
			ref: 'User'
		},
		id_project: {
			type: String
		}
	
	},
	{ timestamps: true }
);

//teamSchema.plugin(timestamps);

module.exports = mongoose.model('Team', teamSchema);