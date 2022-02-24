export default class {

    constructor(id = undefined, firstName, lastName, email, password) {
      //let {error} = validator({id, firstName, lastName, email, password})
     // if (error) throw new Error(error)
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
  }