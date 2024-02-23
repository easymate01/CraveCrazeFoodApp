using Microsoft.AspNetCore.Mvc;
using Server.Models.S3;
using Server.Services.AwsS3;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly IStorageService _storageService;
        private readonly ILogger<CategoryController> _logger;
        private readonly IConfiguration _configuration;

        public CategoryController(IStorageService storageServiceservice, ILogger<CategoryController> logger, IConfiguration configuration)
        {
            _storageService = storageServiceservice;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost(Name = "UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            await using var memoryStr = new MemoryStream();

            await file.CopyToAsync(memoryStr);

            var fileExt = Path.GetExtension(file.Name);
            var objName = $"{Guid.NewGuid()}.{fileExt}";

            var s3Obj = new S3Object()
            {
                BucketName = "cravecraze",
                InputStream = memoryStr,
                Name = objName
            };

            var cred = new AwsCredentials()
            {
                AwsKey = _configuration["AWSConfiguration:AWSAccessKey"],
                AwsSecret = _configuration["AWSConfiguration:AWSSecretKey"],

            };

            var result = await _storageService.UploadFileAsync(s3Obj, cred);
            if (result.StatusCode != 200)
            {
                return NotFound(result);
            }
            return Ok(result);
        }
    }
}
