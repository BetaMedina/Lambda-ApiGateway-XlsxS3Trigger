const { S3 } = require("../common/S3");
const FormData = require("../common/BusBoy");
const uuid = require("uuid");
const { response } = require("../common/Response");

const bucket = process.env.bucketName;

module.exports.main = async (event) => {
  try {
    const formData = await FormData.parser(event);
    const file = formData.files[0];

    const key = `${uuid.v4()}_original_${file.filename}`;

    const newFile = await S3.write(bucket, Buffer.from(file.content), key, file.contentType);

    if (!newFile) {
      return response._400({ message: "File has not been uploaded" });
    }
    return response._200(newFile);
  } catch (err) {
    return response._400({ message: err.message });
  }
};
