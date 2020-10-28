const { S3 } = require("../common/S3");
const { Dynamo } = require("../common/Dynamo");
const uuid = require("uuid");
const xlsx = require("xlsx");

const bucket = process.env.bucketName;
const tableName = process.env.tableName;

module.exports.main = async (event) => {
  const filename = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const s3Excell = await S3.getFile(bucket, filename);
  const workbook = xlsx.read(s3Excell.Body, { type: "array" });

  const xlsxData = xlsx.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]],
    { raw: true }
  );

  await Promise.all(
    xlsxData.map(async (rows) => {
      return Dynamo.write(
        {
          ID: uuid.v4(),
          name: rows.name,
          email: rows.email,
          password: rows.password,
          number: rows.number,
          status: rows.status,
        },
        tableName
      );
    })
  );
};
