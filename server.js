const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Routes
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// file uplaod
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use(errorHandler);

const server = app.listen(process.env.PORT || 5001, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}.red`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
