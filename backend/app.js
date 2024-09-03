import { PrismaClient } from '@prisma/client';
// const { PrismaClient } = require('@prisma/client')
import bcrypt from 'bcryptjs'
// const bcrypt = require('bcrypt');

async function hash(data)
{
    bcrypt.hash(userPassword, salt, (err, hash) => {
        if (err)
            throw Error("Error generating hash: " + err);
        return hash;
    });
    throw Error("Error generating hash");
}

const prisma = new PrismaClient()

async function main() {
    // Read from db:
    const all_users = await prisma.user.findMany(); // Note that it's user and not User
    console.log(all_users);
    // Write to db:
    await prisma.user.create({
        data: {
            email: 'mail@gmail.com',
            password: hash("Hello world"),
            type: prisma.usertype.client,
            name: "John Doe",
            surname: "Johnigga",
            birth_date: "NEVER",
            gender: "chair",
            description: "ur mama so fat she falls both ways outa the bed",
            astrological_sign: "Mummy",
            coach: {
                create: {
                    email: 'mail2@gmail.com',
                    password: hash("password1"),
                    type: prisma.usertype.employee,
                    name: "John Doe2",
                    surname: "Johnigger",
                    birth_date: "NEVER",
                    gender: "table",
                    description: "ur mama so fat we thought she was the moon",
                    astrological_sign: "Daddy",
                    work: "see people FAIL",
                    client_list: [],
                }
            }
        },
      })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })