const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} = require("@aws-sdk/client-s3");

// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer"); // CJS




const bucketName = process.env.S3_BUCKET;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const assetsRoot = process.env.ASSETS_BASE_URL;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});


function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
    // ACL: "public-read",
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}


async function getObjectUrl(key) {
  // const params = {
  //   Bucket: bucketName, // Replace with your S3 bucket name
  //   Key: key, // Replace with the image object key
  //   // Expires: 3600 // Expiration time in seconds (e.g., 1 hour)
  // };
  
  // const command = new GetObjectCommand(params);
  
  // const signedUrl = await getSignedUrl(s3Client, command, {
  //   expiresIn: 3600, // Expiration time in seconds
  // });

  console.log(`${assetsRoot}/${key}`,"url")

  const url = `${assetsRoot}/${key}`;
  const privateKey = process.env.AWS_S3_PRIVETKEY;
  const keyPairId = process.env.AWS_S3_PUBLIC_KEY_ID;
  const dateLessThan = new Date(Date.now()+ 60 * 60 * 1000 * 24); // any Date constructor compatible

  const signedUrl = getSignedUrl({
    url,
    keyPairId,
    dateLessThan,
    privateKey,
  });

  return signedUrl;
}





module.exports = { uploadFile, deleteFile, getObjectUrl };
