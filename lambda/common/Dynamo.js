const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
  async write(data,TableName){
    if(!data.ID){
      throw new Error('No item on the data')
    }
    const parameters = {
      TableName,
      Item:data
    }
    const createdata = await documentClient.put(parameters).promise()
    if(!createdata){
      throw new Error('data has not been created in Dynamo')
    }
    return data
  }
}

module.exports={Dynamo}