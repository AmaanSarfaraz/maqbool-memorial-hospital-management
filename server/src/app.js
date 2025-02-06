    import express from 'express';
    import cors from 'cors';
    import cookieParser from 'cookie-parser';
    import { errorHandler } from './utilis/ApiError.js';

    const app = express();

    app.use(express.json({ limit: "16kb" }));
    app.use(express.urlencoded({ extended: true, limit: "16kb" }));
    app.use(express.static("public"));

    app.use(cookieParser());
    // CORS configuration
    app.use(cors({
        origin: ['https://sweet-melomakarona-7d8fd9.netlify.app', 'http://localhost:5173'], // Specify allowed origins
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true // Allow credentials
    }));


    app.get('/', (req, res) => {
        res.send("backend is ready");
    });

    // Routes
    import adminRouter from './routes/admin.routes.js';
    import patientRouter from './routes/patient.routes.js';
    import doctorRouter from './routes/doctor.routes.js';
    import blogRouter from './routes/blog.routes.js';
    import messageRouter from './routes/message.routes.js';

    app.use('/api/v1/admin', adminRouter);
    app.use('/api/v1/patient', patientRouter);
    app.use('/api/v1/doctor', doctorRouter);
    app.use('/api/v1/blogs', blogRouter);
    app.use('/api/v1/contact', messageRouter);

    app.use(errorHandler);

    export { app };
