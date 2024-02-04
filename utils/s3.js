const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand
  } = require("@aws-sdk/client-s3");
 
  
  // const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  
  const config =  require('../config.js');
  
  const bucketName = config.AWS_BUCKET_NAME;
  const region = config.AWS_BUCKET_REGION;
  const accessKeyId = config.AWS_ACCESS_KEY;
  const secretAccessKey = config.AWS_SECRET_ACCESS_KEY;
  const assetsRoot = config.ASSETS_BASE_URL;
  
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
      ACL: "public-read",
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
  
  async function getObjectSignedUrl(key) {
    const url = `${assetsRoot}/${key}`;
    return url;
  }
  
  
  
  module.exports = { uploadFile, deleteFile, getObjectSignedUrl };
  