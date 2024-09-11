import { hashSync, genSaltSync } from "bcrypt";
import { employeeType } from "../models/employeeModel";

const salt = genSaltSync(10);

export default [
  {
    id: 1,
    email: "manager@test.com",
    password: hashSync("mdp1", salt),
    type: employeeType.MANAGER,
    name: "ManagerName",
    surname: "ManagerSurname",
    birth_date: new Date("2000-02-25"),
    gender: "H",
    work: "Manager",
  },
  {
    id: 2,
    email: "coach@test.com",
    password: hashSync("mdp2", salt),
    type: employeeType.MANAGER,
    name: "CoachName",
    surname: "CoachSurname",
    birth_date: new Date("2000-02-25"),
    gender: "H",
    work: "Coach",
  },
  {
    id: 3,
    email: "josef@test.com",
    password: hashSync("mdp3", salt),
    type: "Client",
    name: "Joséf",
    surname: "Joséf en quête d'amour",
    birth_date: new Date("2000-02-25"),
    gender: "H",
    work: "Developer",
  }
  ];