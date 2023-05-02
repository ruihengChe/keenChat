const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

//解析json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//解析静态文件
app.use(express.static(path.join(__dirname, 'public')));

//新增路由
app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('启动了！！！')
});