const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3 } = require("../config/s3");

exports.getSignedUrlFromKey = async(key)=>{
  if(!key) return null;

  const command = new GetObjectCommand({
    Bucket:process.env.AWS_S3_BUCKET,
    Key:key
  });

  return await getSignedUrl(s3,command,{ expiresIn:300 }); // 5 min
};
