import { hashSync, genSaltSync } from "bcrypt";

const salt = genSaltSync(10);

export default [
    {
      email: "josef@test.com",
      password: hashSync("mdp3", salt),
      type: "Client",
      name: "Joséf",
      surname: "Joséf en quête d'amour",
      birth_date: new Date("2000-02-25"),
      gender: "H",
      work: "Developer",
      coach_id: 2
  }
  ];