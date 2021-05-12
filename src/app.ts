import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import AuthRoutes from './routes/index';
import cors from 'cors';
import request from './routes/index';
import requestRouter from './routes/request';
import commentRouter from './routes/comments';
import updateRouter from './routes/updaterequest';
import closeRequestRouter from './routes/closerquest';
import userRequestRouter from './routes/request';
import allRequestRouter from './routes/analytics';
import updateUser from './routes/updateRoles';

dotenv.config();
mongoose

  .connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));
let app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(cors());
app.use(cookieparser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', AuthRoutes);
app.use('/request', request);
app.use('/', indexRouter);
app.use('/userrequest', requestRouter);

app.use('/', commentRouter);

app.use('/updaterequest', updateRouter);
app.use('/closerequest', closeRequestRouter);
app.use('/', userRequestRouter);
app.use('/', allRequestRouter);
app.use('/', updateUser);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});
// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export default app;
