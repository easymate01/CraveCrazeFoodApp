namespace Server.Models.S3
{
    public class S3Object
    {
        public string Name { get; set; } = null;

        public IFormFile ImageFile { get; set; } = null;

        public string BucketName { get; set; } = null;
    }
}
