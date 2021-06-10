const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema;

const projectSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		admin: {
			type: mongooseSchema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		description: {
			type: String,
			required: true
		},
		groups: {
			type: mongooseSchema.Types.ObjectId,
			ref: 'Group',
			required: true
		},
		created: {
			type: Date,
			default: Date.now()
		}
		
	},
);

module.exports = mongoose.model('Project', projectSchema);