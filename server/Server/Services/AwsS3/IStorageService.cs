using Server.DTOs;
using Server.Models.S3;

namespace Server.Services.AwsS3
{
    public interface IStorageService
    {
        Task<S3ResponseDto> UploadFileAsync(IFormFile image, AwsCredentials awsCredentials, string bucketName);
    }
}
