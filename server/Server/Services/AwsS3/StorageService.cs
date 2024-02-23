using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Transfer;
using Server.DTOs;
using Server.Models.S3;
using S3Object = Server.Models.S3.S3Object;

namespace Server.Services.AwsS3
{
    public class StorageService : IStorageService
    {

        public async Task<S3ResponseDto> UploadFileAsync(S3Object s3obj, AwsCredentials awsCredentials)
        {
            var credentials = new BasicAWSCredentials(awsCredentials.AwsKey, awsCredentials.AwsSecret);

            var config = new AmazonS3Config()
            {
                RegionEndpoint = Amazon.RegionEndpoint.EUNorth1
            };

            var response = new S3ResponseDto();

            try
            {
                var uploadRequest = new TransferUtilityUploadRequest()
                {
                    InputStream = s3obj.InputStream,
                    Key = s3obj.Name,
                    BucketName = s3obj.BucketName,
                    CannedACL = S3CannedACL.NoACL
                };

                using var client = new AmazonS3Client(credentials, config);

                var transferUtility = new TransferUtility(client);

                await transferUtility.UploadAsync(uploadRequest);

                response.StatusCode = 200;
                response.Message = $"{s3obj.Name} has been uploaded successfully";
            }
            catch (AmazonS3Exception ex)
            {
                response.StatusCode = (int)ex.StatusCode;
                response.Message = $"{ex.Message}";
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Message = $"{ex.Message}";
            }

            return response;
        }
    }
}
