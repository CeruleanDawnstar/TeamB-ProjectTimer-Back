const Project = require('../models/project');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/jwtmiddleware');

exports.createProject = async (_, args, {req}) => {
    try{
        const currentUser = await verifyToken(req);
        if (args.input.name.trim() === '')
			return res.json({
				errorMessage: 'Fill in the field to create a new project'
			});
            if (currentUser) {
                const project = await Project.findOne({ name: args.input.name }).exec();
                if (project)
                    return res.json({
                        errorMessage: 'This name already exists, please choose another one'
                    });
                // Get the user
                const userFromDb = await User.findOne({ email: currentUser.email }).exec();
                // create a new project
                let newProject = new Project({
                    ...args.input,
                    createdBy: userFromDb._id
                })
                    .save()
                    .then((project) => project.execPopulate('createdBy', '_id username name'));
    
                return newProject;
            }
    } catch (error) {
        console.log(error.message);
    }
}

const updateProject = async (_, args, { req }) => {
	const currentUser = await verifyToken(req);
	// validation
	if (args.input.name.trim() === '' && args.input.description.trim() === '')
		return res.json({
			errorMessage: 'Fill in the fields to update a project'
		});
	//  Get current user
	const currentUserFromDb = await User.findOne({ email: currentUser.email }).exec();
	// _id of team or group to update
	const projectToUpdate = await Project.findById({ _id: args.input._id }).exec();
	// Allow update if current user id and id of the team's admin are same,
	if (currentUserFromDb._id.toString() !== projectToUpdate.createdBy._id.toString())
		return res.json({
			errorMessage: "You don't have rights to make changes"
		});
	let updatedProject = await Project.findByIdAndUpdate(args.input._id, { ...args.input }, { new: true })
		.exec()
		.then((project) => project.populate('createdBy', '_id username name').execPopulate());

	return updatedProject;
};

const deleteProject = async (_, args, { req, res }) => {
	const currentUser = await verifyToken(req);
	const currentUserFromDb = await User.findOne({ email: currentUser.email }).exec();
	const projectToDelete = await Project.findById({ _id: args.projectId }).exec();
	// validation
	if (!projectToDelete) return res.json({ errorMessage: "This project does not exist" });
	if (currentUserFromDb._id.toString() !== projectToDelete.createdBy._id.toString())
		return res.json({
			errorMessage: "You do not have the right to delete this project"
		});
	let deletedProject = await Project.findByIdAndDelete({ _id: args.projectId })
		.exec()
		.then((project) => project.populate('createdBy', '_id username name').execPopulate());

	return deletedProject;
};