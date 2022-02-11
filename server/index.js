const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const keys = require('./keys');
const userMiddleware = require('./middleware/userMiddleware');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(userMiddleware);

app.use('/api/todo', todoRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

(async () => {
  try {
    await mongoose.connect(keys.MONGODB_URI);

    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is running');
    })
  } catch (e) {
    console.error(e);
  }
})();
