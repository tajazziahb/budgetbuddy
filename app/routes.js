const { ObjectId } = require('mongodb');

module.exports = function (app, passport, db) {
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    db.collection('transactions')
      .find({ userId: String(req.user._id) })
      .sort({ date: -1 })
      .limit(10)
      .toArray((error, transactions) => {
        if (error) {
          console.error(error);
          return res.render('profile.ejs', { user: req.user, transactions: [] });
        }
        res.render('profile.ejs', { user: req.user, transactions: transactions });
      });
  });

  app.get('/logout', (req, res) => {
    req.logout(() => { });
    res.redirect('/');
  });

  app.post('/transactions', isLoggedIn, (req, res) => {
    const { type, amount, category, date, note } = req.body;
    const dateOnly = date ? new Date(`${date}T00:00:00`) : null;

    const documentToInsert = {
      userId: String(req.user._id),
      type,
      amount: parseFloat(amount),
      category,
      date: dateOnly,
      note: note || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.collection('transactions').insertOne(documentToInsert, (error) => {
      if (error) return res.status(500).send('Error creating transaction');
      res.redirect('/profile');
    });
  });

  app.get('/transactions', isLoggedIn, (req, res) => {
    db.collection('transactions')
      .find({ userId: String(req.user._id) })
      .sort({ date: -1 })
      .toArray((error, transactions) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Error retrieving transactions');
        }
        res.json(transactions);
      });
  });

  app.post('/transactions/:id', isLoggedIn, (req, res) => {
    const transactionId = req.params.id;
    const { type, amount, category, date, note } = req.body;
    const parsedDate = date ? new Date(`${date}T00:00:00`) : null;

    const updatedDocument = {
      type,
      amount: parseFloat(amount),
      category,
      date: parsedDate,
      note: note || '',
      updatedAt: new Date()
    };

    db.collection('transactions').findOneAndUpdate(
      { _id: new ObjectId(transactionId), userId: String(req.user._id) },
      { $set: updatedDocument },
      { returnDocument: 'after' },
      (error, result) => {
        if (error) return res.status(500).send('Error updating transaction');
        if (!result.value) return res.status(404).send('Transaction not found');
        res.redirect('/profile');
      }
    );
  });

  app.post('/transactions/:id/delete', isLoggedIn, (req, res) => {
    const transactionId = req.params.id;
    db.collection('transactions').deleteOne(
      { _id: new ObjectId(transactionId), userId: String(req.user._id) },
      (error, outcome) => {
        if (error) return res.status(500).send('Error deleting transaction');
        if (outcome.deletedCount === 0) return res.status(404).send('Transaction not found');
        res.redirect('/profile');
      }
    );
  });

  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/unlink/local', isLoggedIn, (req, res) => {
    const user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(() => {
      res.redirect('/profile');
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
  }
};