import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import indexRouter from './routes/index';

// Загрузка переменных окружения
dotenv.config();

const app: Application = express();

// Настройка middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Настройка view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Подключение маршрутов
app.use('/', indexRouter);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
