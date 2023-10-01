import express from "express";
import db from "./connection.mjs";
import { MongoCryptAzureKMSRequestError, ObjectId } from "mongodb";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('SWAMISAMARTHA').status(200);
});

router.get('/getSearchPostComments/:search_term', async(req, res) => {
    const searchTerm = req.params.search_term;
    let collection = db.collection('activities');
    try {
        const response = await collection.find({
            $or: [
                {post: {$regex: searchTerm, $options: 'i'}},
                {'comments.comment': {$regex: searchTerm, $options: 'i'}}
            ]
        }).toArray();
        return res.status(200).send(response);
    } catch(err) {
        return res.status(403).send(err);
    }
})

router.post('/login', async (req, res) => {
    let collection = db.collection('users');
    const {email, password} = req.body;
    if(!email && !password) {
        return res.status(400).send('Email and Password Required');
    }
    if(!email) {
        return res.status(400).send('Email Required');
    } 
    if (!password) {
        return res.status(400).send('Password Required');
    }
    const user = await collection.findOne({email: email});
    if(user) {
        if(password === user.password) {
            return res.status(200).send(user._id);
        } else {
            return res.status(401).send('Password Does Not Match');
        }
    } else {
        return res.status(403).send('User Not Found');
    }
});

router.post('/signup', async(req, res) => {
    let collection = db.collection('users');
    const {name, email, password} = req.body;
    if(!name && !email && !password) {
        return res.status(400).send('All Fields are Required');
    }
    if(!name) {
        return res.status(400).send('Name is Required');
    }
    if(!email) {
        return res.status(400).send('Email is Required');
    }
    if(!password) {
        return res.status(400).send('Password is Required');
    }
    const exists = await collection.findOne({email: email});
    if(exists) {
        return res.status(403).send('User Already Exists');
    } else {
        const newUser = (await collection.insertOne(req.body)).insertedId;
        return res.status(200).send(newUser);
    }
});

router.post('/addPost', async(req, res) => {
    let collection = db.collection('activities');
    try {
        const newPost = (await collection.insertOne(req.body)).insertedId;
        return res.status(200).send(newPost);
    } catch(err) {
        return res.status(403).send(err);
    }
});

router.post('/addComment', async(req, res) => {
    let collection = db.collection('activities');
    const activityId = new ObjectId(req.body.id);
    const comment = req.body;
    delete comment['id'];
    try {
        const response  = await collection.updateOne({_id: activityId}, {$push: {comments: comment}});
        if(response.modifiedCount === 1) {
            return res.status(200);
        } 
        return res.status(400);
    } catch(err) {
        return res.status(405).send(err);
    }
});


router.get('/addLike/:activity_id/:author_id', async (req, res) => {
    let collection = db.collection('activities');
    const activityId = new ObjectId(req.params.activity_id);
    const authorId = new ObjectId(req.params.author_id);
    try {
        const response = await collection.updateOne({_id: activityId}, {$push: {likes: authorId}});
        if(response.modifiedCount === 1) {
            return res.status(200);
        } else {
            return res.status(400);
        }
    } catch(err) {
        return res.status(403).send(err);
    }
});

router.get('/getAllActivities', async (req, res) => {
    let collection = db.collection('activities');
    try {
        const result = await collection.find({}).toArray();
        return res.status(200).send(result);
    } catch(err) {
        return res.status(403).send(err);
    }
});

router.get('/getSingleActivity/:activity_id', async (req, res) => {
    let collection = db.collection('activities');
    const activityId = new ObjectId(req.params.activity_id);
    try {
        const response = await collection.findOne({_id: activityId});
        return res.status(200).send(response);
    } catch (err) {
        return res.status(403).send(err);
    }
})

router.get('/getUserNameFromId/:id', async (req, res) => {
    let collection = db.collection('users');
    const userId = new ObjectId(req.params.id);
    try {
        const response = await collection.findOne({_id: userId}, {projection: {email: 0, password: 0}});
        return res.status(200).send(response);
    } catch(err) {
        return res.status(403).send(err);
    }
});

export default router;