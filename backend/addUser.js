import User from "./models/userModel.js";

import { hashSync, genSaltSync } from "bcrypt";

const user = User.findOne({
    where: {
        email: process.env.REMOTE_API_EMAIL
    }
})

if (!user) {
    console.error("User not found");
    process.exit(1);
}

user.password = hashSync(process.env.REMOTE_API_PASSW, genSaltSync(10));

user.save();