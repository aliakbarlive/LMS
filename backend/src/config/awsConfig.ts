import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
import { Readable } from "stream";
import { getFolderName } from "../utils/helpers";

const { AWS_KEY, AWS_SECRET, AWS_REGION, AWS_BUCKET } = process.env;

AWS.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_REGION,
});

const s3 = new S3();

async function uploadBufferToS3(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const params: S3.PutObjectRequest = {
    Bucket: AWS_BUCKET || "defaultBucketName",
    Key: fileName,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read",
    CacheControl: "max-age=31536000",
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

/**
 * Uploads a stream to S3 and returns the file URL.
 *
 * @param {Readable} fileStream - The stream of the file to upload
 * @param {string} moduleName - The name of the module
 * @param {string} fileName - The name of the file
 * @param {string} contentType - The content type of the file
 * @return {Promise<string>} The URL of the uploaded file
 */
export async function uploadStreamToS3(
  fileStream: Readable,
  moduleName: string,
  fileName: string,
  contentType: string
): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of fileStream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  // Construct the folder path
  const currentDateFolder = getFolderName();
  const timestamp = Date.now();
  const fileNamePath = `${moduleName}/${currentDateFolder}/${timestamp}-${fileName}`;
  const fileUrl = await uploadBufferToS3(buffer, fileNamePath, contentType);
  return fileUrl;
}

async function findAndDelteS3File(fileName: string) {
  // Delete the old file
  const deleteParams = {
    Bucket: AWS_BUCKET || "defaultBucketName",
    Key: fileName,
  };

  try {
    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    console.error("Error in deleting old file:", error);
    return;
  }
}

export { findAndDelteS3File };
