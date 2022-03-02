# Strapi application

Установка

`npm install`

Чтобы запустить локальный сервер

`npm run develop`

# Конфигурация

Для конфигурации создайте/измените файл 
`.env
`

Для настройки базы данных:
`config/database.js`

По умолчанию база данных Mongoose


Для того, чтобы запустить локально необходимо иметь дамп базы данных.
Чтобы ее получить необходимо на сервере выполнить

`
mongodump --host 127.0.0.1:27017 --db strapi && 
mongodump --host 127.0.0.1:27017 --db admin && 
mongodump --host 127.0.0.1:27017 --db fardonation &&
mongodump --host 127.0.0.1:27017 --db local
`

Чтобы импортировать бд:

`mongorestore -d strapi _<folder>_
`


#Деплой

1) Клонировать репозиторий

    `git clone git@github.com:rylkov-foundation/fond-rylkova-strapi.git`
2) Создать в корне проекта файл .env и заполнить все его поля
   Заполнить поля` ADMIN_JWT_SECRET, PORT и URL`.

   Для этого надо сгенерировать секретный ключ:

    `    openssl rand 256 | base64`
    ```
     ADMIN_JWT_SECRET=your_secret_key
     PORT=1337
     URL=https://your_domen/api
   ```
3) Установить зависимости командой 

    `npm i`
4) Собрать проект командой 

    `NODE_ENV=production npm run build --clean`
5) Запустить проект командой 
   
    `pm2 start`
6) Добавить автозапуск скрипта командой

    `pm2 startup`
7) Сохранить конфигурацию командой

   ` pm2 save`

