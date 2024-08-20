const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://Users:CCrTySMdLZ3YLGZ0@cluster0.gxidgzw.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0/';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
});

app.get('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err.message });
    }
});

// Route to handle updating a user
app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
});

// Route to handle adding a new user
app.post('/AddUser', async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user', details: err.message });
    }
});

// New route to handle deleting a user
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
