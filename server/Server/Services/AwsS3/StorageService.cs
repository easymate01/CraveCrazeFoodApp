using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Transfer;
using Server.Models.S3;

namespace Server.Services.AwsS3
{
    public class StorageService : IStorageService
    {
        public async Task<string> UploadImageAsync(IFormFile image, AwsCredentials awsCredentials, string folderName, string bucketName)
        {
            var credentials = new BasicAWSCredentials(awsCredentials.AwsKey, awsCredentials.AwsSecret);

            var config = new AmazonS3Config()
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUNorth1
            };

            try
            {
                var uploadRequest = new TransferUtilityUploadRequest()
                {
                    InputStream = image.OpenReadStream(),
                    Key = $"{folderName}/{Guid.NewGuid()}{Path.GetExtension(image.FileName)}",
                    BucketName = bucketName,
                    CannedACL = S3CannedACL.NoACL
                };

                using var client = new AmazonS3Client(credentials, config);
                var transferUtility = new TransferUtility(client);
                await transferUtility.UploadAsync(uploadRequest);

                return $"https://{bucketName}.s3.amazonaws.com/{uploadRequest.Key}";
            }
            catch (AmazonS3Exception ex)
            {
                throw new Exception($"Amazon S3 error: {ex.Message}");
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading image: {ex.Message}");
            }
        }
    }
}