const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema;
//const timestamps = require('mongoose-timestamps')

const teamSchema = mongoose.Schema(
	{
		name: {
			type: String
		},
		user: {
			type: mongooseSchema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		description: {
			type: String,
			required: true
		}
	
	},
	{ timestamps: true }
);

//teamSchema.plugin(timestamps);

module.exports = mongoose.model('Team', teamSchema);