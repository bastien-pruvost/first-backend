const Thing = require('../models/Thing');
const fs = require('fs');

// --- POST ---
// POST one stuff
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié avec succés' }))
    .catch(error => res.status(400).json(error));
};

// --- DELETE ---
// DELETE One Stuff
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (!thing) {
        return res.status(404).json({
          error: new Error('Objet non trouvé !')
        });
      }
      if (thing.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('Requête non autorisée')
        });
      }
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé avec succés' }))
          .catch(error => res.status(400).json(error));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
