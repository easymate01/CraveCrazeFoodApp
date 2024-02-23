using Server.DTOs;
using Server.Models.S3;
using S3Object = Server.Models.S3.S3Object;

namespace Server.Services.AwsS3
{
    public interface IStorageService
    {
        Task<S3ResponseDto> UploadFileAsync(S3Object s3obj, AwsCredentials awsCredentials);
    }
}
