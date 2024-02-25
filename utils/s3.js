const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand
  } = require("@aws-sdk/client-s3");
 
  
  // const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  

  
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
    return `${assetsRoot}/${key}`;
  }


  
  
  
  module.exports = { uploadFile, deleteFile,getObjectUrl };
  