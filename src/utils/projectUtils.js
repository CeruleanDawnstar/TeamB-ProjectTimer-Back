const mongoose = require('mongoose')
const Model = mongoose.model("Project")

/**
 * Check if user is the admin
 * @param {*} project 
 * @param {*} user 
 * @returns true
 */
exports.checkIfAdmin = async (project, user) => {
    await this.checkId(project)

    const find = {
        _id: project,
        admin: {
            _id: user
        }
    }
    
    const isAdmin = await  Model.exists(find)
    if (!isAdmin) {
        throw new Error("Only admin can perform this task");
    }

    return true
}

/**
 * Check if id exists
 * @param {*} id 
 * @returns true
 */
exports.checkId = async (id) => {
    if (id === '') {
        throw new Error("This is not a valid id");
    } else {
        const exist = await Model.exists({_id: id})
        if (!exist) throw new Error("This id does not exist");
    }

    return true
}

/**
 *  Check if the data sent in the request is valid for the operation. Throws errors accordingly if not.
 *  @param {Array} req
 *  @return true
 * */
exports.checkData = async (req) => {

    const project = req.params.id
    const name = req.body.name
    if (!name) {
        throw new Error('Add a name');
    }

    let proj

    if (project) {
        const user = req.user._id
        await this.checkIfAdmin(project, user)

        proj = await Model.exists({_id: {$nin: project},name: name.trim()})

        const admin = req.body.admin
        if (!admin) throw new Error('Insert an id for the admin')
    } else {
        proj = await Model.exists({name: name})
    }

    if (proj) throw new Error('Name used by another project')
}