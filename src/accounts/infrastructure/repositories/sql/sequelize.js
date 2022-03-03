import  Sequelize  from 'sequelize'

const connect = (url)=>{
const sequelize = new Sequelize(url);

sequelize.define('account', {
    // Name of Column #1 and its properties defined: id
    id: {
      // Integer Datatype
      type: Sequelize.UUID,
      // To uniquely identify user
      primaryKey: true
    },
    // Name of Column #2: name
    firstName: { type: Sequelize.STRING, allowNull: false },
    // Name of Column #3: name
    lastName: { type: Sequelize.STRING, allowNull: false },

    // Name of Column #3: email
    email: { type: Sequelize.STRING, allowNull: false },

    // Name of Column #3: email
    password: { type: Sequelize.STRING, allowNull: false },
  })
  
  return sequelize;
}

export default  {connect: connect};