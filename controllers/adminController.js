const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { giveToken } = require('../token-functions');

exports.registerAdmin = async (req, res) => {
  try {
    const adminInDb = await Admin.findOne({username: req.body.username});
    if (adminInDb) {
      return res.status(400).send('This admin is already in the database');
    }
    const hashedPsw = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new Admin({
      username: req.body.username,
      password: hashedPsw
    });
    await newAdmin.save();
    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(503);
  }
}

exports.loginAdmin = async (req, res) => {
  try {
    const adminInDb = await Admin.findOne({username: req.body.username});
    if (!adminInDb) {
      return res.status(400).send('There is no admin with this username');
    }
    const comparePsw = await bcrypt.compare(req.body.password, adminInDb.password);
    if (!comparePsw) {
      return res.status(400).send('Incorrect password');
    }
    const token = giveToken({username: req.body.username});
    res.status(200).json({token});
  } catch(err) {
    res.sendStatus(503);
  }
}