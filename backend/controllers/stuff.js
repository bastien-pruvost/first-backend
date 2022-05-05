const Thing = require('../models/Thing');

// --- POST ---
// POST one stuff
exports.createThing = (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error: error }));
};

// --- GET ---
// GET All Stuff
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error: error }));
};

// GET One Stuff
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json(error));
};

// --- PUT ---
// PUT One Stuff (Update)
exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié avec succés' }))
    .catch(error => res.status(400).json(error));
};

// --- DELETE ---
// DELETE One Stuff
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé avec succés' }))
    .catch(error => res.status(400).json(error));
};
