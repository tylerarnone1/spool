const Student = require('../models/spool');

module.exports = {
  index,
  addFact,
  delFact
};

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('spools/index', { 
      users,
       name: req.query.name, 
       sortKey ,
       user: req.user
      });
  });
}

function addFact(req, res, next) {
  req.user.facts.push(req.body);
   req.user.save(function(err) {
     res.redirect('/users');
   });
}

function delFact(req, res, next) {

}
