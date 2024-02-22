using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Services;
using System.Text;
using webapi.Services.Authentication;

var builder = WebApplication.CreateBuilder(args);

AddAuthentication();
AddIdentity();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationInsightsTelemetry();
ConfigureServices();

var app = builder.Build();


// Configure CORS
app.UseCors(builder =>
{
    builder.AllowAnyOrigin(); // You can replace this with specific origins
    builder.AllowAnyHeader();
    builder.AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


void ConfigureServices()
{
    builder.Services.AddTransient<IRestaurant, RestaurantService>();
    builder.Services.AddTransient<IDish, DishService>();

    builder.Services.AddDbContext<DataContext>();
    builder.Services.AddDbContext<UsersContext>();

    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<ITokenService, TokenService>();
}

void AddAuthentication()
{

    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "apiWithAuthBackend",
                ValidAudience = "apiWithAuthBackend",
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("!SomethingSecret!")
                ),
            };
        });
}

void AddIdentity()
{
    builder.Services
        .AddIdentityCore<IdentityUser>(options =>
        {
            options.SignIn.RequireConfirmedAccount = false;
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        })
        .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<DataContext>();
}