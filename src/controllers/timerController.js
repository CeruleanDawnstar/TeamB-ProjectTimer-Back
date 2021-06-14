const mongoose = require('mongoose');
const schema = require('../models/timerModel');
const Model = mongoose.model("Timer");
const projectUtils = require('../utils/projectUtils');
const timerUtils = require('../utils/timerUtils');

exports.setTimer = async (req, res) => {
    try {
        const user = req.body.user._id
        console.log(user)
        const find = {
            user: user,
            dateEnd: null
           
        }
        
        const isActive = await Model.findOne(find, (err, result) => {
            if (err) console.log(err)
            return result;
        });

        if (isActive) {
            const find = {
                _id: isActive._id
            }

            const update = {
                end: Date.now()
            }

            Model.findOneAndUpdate(find, update, {new: true}, async (err, updated) => {
                if (err) console.log(err)

                await updated.populate('user', ['email', 'name']).execPopulate()
                await updated.populate('project', 'name').execPopulate()
    
                res.status(200).json({
                    message: "Timer was stopped",
                    active: false,
                    data: updated
                })
            })

        } else {
            const project = req.body.project
            await projectUtils.checkId(project)

            const newTimer = new schema({
                project: project,
                user: user,
                dateStart: Date.now()
            })

            newTimer.save(async (err, created) => {
                if (err) console.log(err)

                await created.populate('user', ['email', 'name']).execPopulate()
                await created.populate('project', 'name').execPopulate()

                res.status(200).json({
                    message: "Timer  has started",
                    active: true,
                    data: created
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
};

exports.getTimerByUser = async (req, res) => {
    try {
        const user = req.params.id

        const find = {
            user: user
        }

        Model.find(find)
        .populate('user', ['email', 'name'])
        .populate('project', 'name')
        .exec((err, result) => {
            if (err) {
				console.log(err);
			} else{
				res.status(200);
				res.json(result);
			}
            
        })

    } catch (error) {
        console.log(error)
    }
};

exports.getTimerByProject = async (req, res) => {
    try {
        const project = req.params.id
        await projectUtils.checkId(project)

        const find = {
            project: project
        }

        Model.find(find)
        .populate('user', ['email', 'name'])
        .populate('project', 'name')
        .exec((err, result) => {
            if (err) console.log(err)
            res.status(200).json(result)
        })

    } catch (error) {
        console.log(error);
    }
};

exports.updateTimer = async (req, res) => {
    try {
        const timer = req.params.id
        await timerUtils.checkId(timer)

        const find = {
            _id: timer
        }

		const update = {
			end: Date.now()
		}

        Model.findOneAndUpdate(find, update, {new: true}, async (error, updated) => {
            if (error) console.log(error)

            await updated.populate('user', ['email', 'name']).execPopulate()
            await updated.populate('project', 'name').execPopulate()

            res.status(200).json({
                message: "Timer was stopped",
                active: false,
                data: updated
            })
        })
    } catch (error) {
        console.log(error)
    }
};

exports.deleteTimer = async (req, res) => {
    try {
        const timer = req.params.id
        await timerUtils.checkId(timer)

        const find= {
            _id: req.params.id
        }

        Model.remove(find, (error) => {
            res.status(200);
			res.json({"message": "Timer was deleted"});
            if (error) console.log(error)
        })

    } catch (error) {
        console.log(error);
	}
};