const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timerSchema = new Schema(
	{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            project: {
                type: Schema.Types.ObjectId,
                ref: 'Project',
                required: true
            },
            
            start: {
                type: Date,
                default: Date.now 
            },
            end: {
                type: Date
                 
            }

	},
);

module.exports = mongoose.model('Timer', timerSchema);