const mongoose = require('mongoose')
const projectUtils = require('../utils/projectUtils')
const Project = require('../models/projectModel')
const Model = mongoose.model("Project")

exports.createProject = async (req, res) => {
    try {
        await projectUtils.checkData(req);

        const newProject = new Project({
            name: req.body.name,
            groups: req.body.groups,
            admin: req.user._id
        });

        newProject.save(async (error, project) => {
            if (error) {
				console.log(error)
			}
            await project.populate('groups', 'name').execPopulate()
            await project.populate('admin', ['email', 'name']).execPopulate()
            return res.status(200).json(project)
        });

    } catch (error) {
        console.log(error.message)
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        await Model.find({})
        .populate('groups', 'name')
        .populate('admin', ['email', 'name'])
        .exec((error, results) => {
            if (error) console.log(error)
            res.status(200).json(results);
        })
    } catch (error) {
        console.log(error.message)
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = req.params.id
        await projectUtils.checkId(project)

        const find = {
            _id: project
        }

        await Model.findById(find)
        .populate('groups', 'name')
        .populate('admin', ['email', 'name'])
        .exec((error, results) => {
            if (error) console.log(error)
            res.status(200).json(results)
        })

    } catch (error) {
        console.log(error.message)
    }
};

exports.updateProject = async (req, res) => {
    try {
        await projectUtils.checkData(req)

        const updateProject = {
            name: req.body.name,
            groups: req.body.groups,
            admin: req.body.admin
        };

        const find = {
            _id: req.params.id
        }

        Model.findOneAndUpdate(find, updateProject, {new: true}, async (error, updated) => {
            if (error) console.log(error)
            await updated.populate('groups', 'name').execPopulate()
            await updated.populate('admin', ['email', 'name']).execPopulate()
            res.status(200).json(updated)
        })

    } catch (error) {
        console.log(error.message)
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = req.params.id
        const user = req.user._id
        await projectUtils.checkIfAdmin(project, user)

        const find = {
            _id: project
        }

        Model.remove(find, (error) => {
            if (error) console.log(error)
            res.status(200).json({message: "Project was deleted"})
        })

    } catch (error) {
        console.log(error.message)
    }
};