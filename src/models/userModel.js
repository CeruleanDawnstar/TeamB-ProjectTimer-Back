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
			default:'user',
            enum: ["admin", "user"]
<<<<<<< HEAD
        },
		projects: {
			type: Array,
			default: []
		}
=======
        }
    
>>>>>>> 8e49bc8d9f0411bc27600caab75ea180d698686a
	},
);

module.exports = mongoose.model('User', userSchema);