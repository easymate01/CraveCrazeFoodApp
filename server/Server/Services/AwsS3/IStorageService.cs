using Server.Models.S3;

namespace Server.Services.AwsS3
{
    public interface IStorageService
    {
        Task<string> UploadImageAsync(IFormFile image, AwsCredentials awsCredentials, string bucketName);
    }
}
