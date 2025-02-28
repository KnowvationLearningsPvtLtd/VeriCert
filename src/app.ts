import express from 'express'
import config from './config/config';
import logger from './utils/logger';
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(helmet())
app.use(express.json())


app.use(xss())
app.use(mongoSanitize())

app.use(cors())

// if (config.ENV === 'production') {
// }

app.use(errorHandler)





// app.use('/v1', mainRouter)


app.listen(Number(config.PORT),() => {
   logger.info(`Server is running on PORT:: ${config.PORT}`)
})

