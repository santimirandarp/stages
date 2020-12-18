function setQuery(key, select){
  const project ={"$project":{"_id":0, "quote":1} } 
  if (key==="-"){ //- implies empty
    return select==="sample" 
      ? [{"$sample":{"size":5}}, project ]
      : [{$match:{quote:{$ne:null}}}, project] 
  } else {
    //if key is not - (is a word)
    const reg = new RegExp(key, 'i') 
    const userText =  { "$match":{"quote":{ "$regex": reg } }}
    return select==="sample"
      ? [userText, {"$sample":{"size":5}}, project]
      : [userText, project] 
  }
}

module.exports = setQuery  //default export

