const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String
		},
		email: {
			type: String,
			required: true,
			index: true,
			unique: true
		},
		password: {
			type: String,
            required: true
		},
        role: {
            type: String,
            required: true,
            enum: ["admin", "user"]
        },
		projects: {
			type: Array,
			default: []
		},
		team: {
			type: ObjectId,
			ref: 'Team'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);