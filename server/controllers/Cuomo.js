const models = require('../models');

const { Cuomo } = models;

const shakerPage = async (req, res) => res.render('app');

const shakeCuomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }

  const cuomoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newCuomo = new Cuomo(cuomoData);
    await newCuomo.save();
    return res.json({ redirect: '/shaker' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Cuomo already exists!' });
    }
    return res.status(500).json({ error: 'An error occured whislt making Cuomo!' });
  }
};

const getCuomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Cuomo.find(query).select('name age').lean().exec();

    return res.json({ cuomos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving Cuomos!' });
  }
};

module.exports = {
  shakerPage,
  shakeCuomo,
  getCuomos,
};
