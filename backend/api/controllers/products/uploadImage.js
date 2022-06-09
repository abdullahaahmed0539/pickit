const aws = require("aws-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { promisify } = require("util");

dotenv.config();
const randomBytes = promisify(crypto.randomBytes);

exports.uploadImage = async (req, res) => {
  const region = process.env.AWS_REGION;
  const bucketName = process.env.AWS_BUCKET_NAME;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
  });

  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: `pickitt/products/${imageName}`,
    Expires: 60,
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    res.status(200).json({
      error: {
        status: "0",
        code: "0",
        message: "no error.",
      },
      data: {
        uploadURL,
      },
    });
  } catch {
    err => {
      console.log(err);
      res.status(406).json({
        error: {
          status: "1",
          code: "1",
          message: "Unable to create upload URL.",
        },
        data: {},
      });
    };
  }
};
