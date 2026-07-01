const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const { PrismaClient } = require("@prisma/client");
const  adapter = new PrismaMariaDb({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:  process.env.MYSQL_DATABASE,
    connenctionLimit: 5
})

//initialize

const prisma= new PrismaClient({adapter})
// export
module.exports=prisma