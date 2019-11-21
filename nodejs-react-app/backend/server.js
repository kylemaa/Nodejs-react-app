const express = require('express');
const cors = require ('cors');
// const mongoose = require('mongoose')
import {
  deleteComment,
  getComments,
  postComment,
  patchComment
} from '../src/comment/controllers'
import makeCallback from '../src/express-callbacks'

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000 ;

//App 
app.use(cors());
app.use(express.json());
// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })
// //Add routings
// const prescriptionsRouter = require('./routes/prescriptions');
// const usersRouter = require('./routes/users');

// app.use('/prescriptions', prescriptionsRouter);
// app.use('/users', usersRouter);

// app.listen(port, () => {console.log(`Server is running on port ${port}`)});
const apiRoot = process.env.DM_API_ROOT
app.post(`${apiRoot}/comments`, makeCallback(postComment))
app.delete(`${apiRoot}/comments/:id`, makeCallback(deleteComment))
app.delete(`${apiRoot}/comments`, makeCallback(deleteComment))
app.patch(`${apiRoot}/comments/:id`, makeCallback(patchComment))
app.patch(`${apiRoot}/comments`, makeCallback(patchComment))
app.get(`${apiRoot}/comments`, makeCallback(getComments))

if (process.env.DM_ENV === 'dev') {
  // listen for requests
  app.listen(3000, () => {
    console.log('Server is listening on port 3000')
  })
}

export default app
