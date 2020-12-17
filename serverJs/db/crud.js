const findUser = async (client, username, password) => {
  const user = await client
    .db("todos")
    .collection("users")
    .findOne(
      { 
        username:username, 
        password:password 
      },
      { username:1, password:1 } )
  return user
}


const createUser = async (client, username, password) => {
  const user = await client
    .db("todos")
    .collection("users")
    .insertOne(
      { 
        username:username, 
        password:password 
      })
  return user
}

const deleteUser = async (client, username, password) => {
  const user = await client
    .db("todos")
    .collection("users")
    .deleteOne(
      { 
        username:username, 
        password:password 
      })
  return user
}

module.exports = {
  findUser:findUser, 
  createUser:createUser, 
  deleteUser:deleteUser
}
