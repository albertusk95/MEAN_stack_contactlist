var express = require('express');
var router = express.Router();

var mongodb = require('mongodb'),
    ObjectId = mongodb.ObjectID;
	
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact List' });
});

/* GET contact list */
router.get('/contactlist', function(req, res, next) {
	console.log("Get from MongoDB");
	
	var db = req.db;
    var collection = db.get('contactcoll');
    collection.find({}, {}, function(e, docs) {
        res.json(docs);
    });
});

/* POST new contact */
router.post('/contactlist', function(req, res, next) {
	var db = req.db;
    var collection = db.get('contactcoll');
    collection.insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/* DELETE contact */
router.delete('/contactlist/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('contactcoll');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/* CHOOSE contact to edit */
router.get('/contactlist/:id', function(req, res) {
	var db = req.db;
    var collection = db.get('contactcoll');
    var userToEdit = req.params.id;
	console.log('editing ' + userToEdit);
    collection.find({_id : ObjectId(userToEdit)}, {}, function(e, docs) {
		console.log('docs: ' + docs);
        res.json(docs);
    });
});

/* UPDATE contact */
router.put('/contactlist/:id', function(req, res) {
	var db = req.db;
    var collection = db.get('contactcoll');
    var userToUpdate = req.params.id;
	
	collection.findOneAndUpdate({
		query: {_id: ObjectId(userToUpdate)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(e, docs) {
			res.json(docs);
		}
	);
});

module.exports = router;
