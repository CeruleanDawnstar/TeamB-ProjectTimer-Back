const mongoose = require('mongoose');
const Model = require('../models/timerModel');

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