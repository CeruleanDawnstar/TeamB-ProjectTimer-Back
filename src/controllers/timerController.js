const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Timer = require('../models/timerModel');
const { verifyToken } = require('../middlewares/jwtmiddleware');

exports.createTimer = async (_, args, { req }) => {
    try {
		const currentUser = await verifyToken(req);

		if (args.input.title.trim() === '')
			return res.json({
				errorMessage: 'Fill in the blank to create a new task'
			});

		if (currentUser) {
			const project = await Project.findOne({ _id: args.projectId }).exec();

			// update project tasks field 
			await Project.findOneAndUpdate({ _id: args.projectId }, { tasks: { ...args.input } }, { new: true }).exec();

			// create a new timer
			let newTimer = new Timer({
				...args.input,
				project: project._id
			})
				.save()
				.then((timer) => timer.execPopulate('project', '_id name description createdBy'));

			return newTimer;
		}
	} catch (error) {
		console.log(error.message);
	}
};

// return all timers per project for a given user
exports.timersPerProject = async (_, args, { req }) => {
    try {
		const currentUser = await verifyToken(req);
		if (currentUser) {
			const currentProject = await Project.findById({ _id: args.projectId }).exec();
			if (currentProject) return await Timer.find({}).sort({ createdAt: -1 }).exec();
		}
	} catch (error) {
		console.log(error);
	}
};

exports.updateTimer = async (_, args, { req }) => {
	const currentUser = verifyToken(req); 

	if (args.input.title.trim() === '' && args.input.description.trim() === '')
		return res.json({
			errorMessage: 'Fill in the blank to update tasks for this project'
		});
	//  Get current user 
	const currentUserFromDb = await User.findOne({ email: currentUser.email }).exec();
	// _id of team to update
	const timerToUpdate = await Timer.findById({ _id: args.input._id }).exec();
	// Update if current user id team's admin id are the same,
	if (currentUserFromDb._id.toString() !== timerToUpdate.project.createdBy._id.toString())
		return res.json({
			errorMessage: "You do not have the rights to perform this action"
		});
	let updatedTimer = await Timer.findByIdAndUpdate(args.input._id, { ...args.input }, { new: true })
		.exec()
		.then((timer) => timer.populate('project', '_id name description createdBy').execPopulate());

	return updatedTimer;
};

exports.deleteTimer = async (_, args, { req }) => {
	const currentUser = verifyToken(req); 

	const currentUserFromDb = await User.findOne({ email: currentUser.email }).exec();
	const timerToDelete = await Timer.findById({ _id: args.timerId }).exec();
	
	if (!timerToDelete) return res.json({ errorMessage: "This project does not exist" });
	if (currentUserFromDb._id.toString() !== timerToDelete.project.createdBy._id.toString())
		return res.json({
			errorMessage: "You do not have the rights to perform this action"
		});
	let deletedTimer = await Timer.findByIdAndDelete({ _id: args.timerId })
		.exec()
		.then((timer) => timer.populate('project', '_id name description createdBy').execPopulate());

	return deletedTimer;
};

