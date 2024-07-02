import { IUser } from "./user.interface";

export class User implements IUser {

  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  document: string;
  admin: boolean;

  constructor(user: User) {

    this.id = user == undefined ? '' : user.id;
    this.name = user == undefined ? '' : user.name;
    this.email = user == undefined ? '' : user.email;
    this.username = user == undefined ? '' : user.username;
    this.password = user == undefined ? '' : user.password;
    this.document = user == undefined ? '' : user.document;
    this.admin = user == undefined ? false : user.admin;
  }

}
