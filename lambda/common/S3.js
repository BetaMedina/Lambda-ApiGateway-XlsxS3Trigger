const AWS = require("aws-sdk");
const S3Client = new AWS.S3();

const S3 = {
  async write(bucket, file, fileName, fileType) {
    const params = {
      Bucket: bucket,
      Body: file,
      Key: fileName,
      ACL: "public-read",
      ContentType: fileType,
      
    };

    const s3Response = await S3Client.upload(params).promise();
    if (!s3Response) {
      throw new Error("File not upload in s3");
    }
    return s3Response
  },
  async getFile(bucket, key) {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    const s3Response = await S3Client.getObject(params).promise();
    if (!s3Response) {
      throw new Error("File not inside s3");
    }
    return s3Response
  },
};
module.exports={S3}