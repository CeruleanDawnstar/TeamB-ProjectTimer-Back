const Team = require('../models/teamModel');


exports.listAllTeam = (req, res) => {
    Team.find({}, (error, team) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json(team);
        }
    });
}


exports.createATeam = (req, res) => {
    let newTeam = new Team(req.body);
    newTeam.id_project = req.params.id_project;


    newTeam.save((error, team) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(201);
            res.json(team);
        }
    });
}



exports.getATeam = (req, res) => {
    Team.findById(req.params.id_team, (error, team) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json(team);
        }
    })
}

exports.updateATeam = (req, res) => {
    Team.findByIdAndUpdate(req.params.id_team, req.body, {
        new: true
    }, (error, team) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json(team);
        }
    })
}

exports.deleteATeam = (req, res) => {
    Team.findByIdAndDelete(req.params.id_team, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json({
                message: "team supprimé"
            });
        }
    });
}