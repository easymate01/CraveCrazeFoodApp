using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Server.Services;
using Server.Services.AwsS3;
using Server.Services.Ordering;
using Server.Services.Ordering.Repository;
using Server.Services.Ordering.ShoppingCart;
using System.Text;
using webapi.Services.Authentication;

Env.Load();

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
ConfigureSwagger();

var app = builder.Build();
AddRoles();


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

    builder.Services.AddScoped<RestaurantService>();
    builder.Services.AddDbContext<DataContext>();

    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<ITokenService, TokenService>();
    builder.Services.AddScoped<IStorageService, StorageService>();
    builder.Services.AddScoped<ICategoryService, CategoryService>();
    builder.Services.AddScoped<ICartService, CartService>();
    builder.Services.AddScoped<ICartItemService, CartItemService>();
    builder.Services.AddScoped<IOrderService, OrderService>();



}

void AddAuthentication()
{
    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.IncludeErrorDetails = true;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "apiWithAuthBackend",
                ValidAudience = "apiWithAuthBackend",

                // Use the helper method to ensure a 32-byte key
                IssuerSigningKey = new SymmetricSecurityKey(
                    PadKey(Encoding.UTF8.GetBytes("!SomethingSecret!"), 32)
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

void ConfigureSwagger()
{
    builder.Services.AddSwaggerGen(option =>
    {
        option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter a valid token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    }
                },
                new string[]{}
            }
        });
    });
}

void AddRoles()
{
    using var scope = app.Services.CreateScope();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var tAdmin = CreateAdminRole(roleManager);
    tAdmin.Wait();

    var tUser = CreateUserRole(roleManager);
    tUser.Wait();
}

async Task CreateAdminRole(RoleManager<IdentityRole> roleManager)
{
    await roleManager.CreateAsync(new IdentityRole("Admin"));
}

async Task CreateUserRole(RoleManager<IdentityRole> roleManager)
{
    await roleManager.CreateAsync(new IdentityRole("User"));
}

void AddAdmin()
{
    var tAdmin = CreateAdminIfNotExists();
    tAdmin.Wait();
}

async Task CreateAdminIfNotExists()
{
    using var scope = app.Services.CreateScope();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    var adminDB = await userManager.FindByEmailAsync("admin@admin.com");

    if (adminDB == null)
    {
        var admin = new IdentityUser { UserName = "admin", Email = "admin@admin.com" };
        var adminCreated = await userManager.CreateAsync(admin, "admin123");

        if (adminCreated.Succeeded)
        {
            var roleAssignment = await userManager.AddToRoleAsync(admin, "Admin");
            if (roleAssignment.Succeeded)
            {
                // Log success
                Console.WriteLine("Admin user and role assignment succeeded.");
            }
            else
            {
                // Log role assignment failure
                Console.WriteLine("Failed to assign the Admin role to the user.");
            }
        }
        else
        {
            // Log user creation failure
            Console.WriteLine("Failed to create the admin user.");
        }
    }
}

byte[] PadKey(byte[] key, int length)
{
    if (key.Length >= length)
    {
        return key;
    }

    byte[] paddedKey = new byte[length];
    Array.Copy(key, paddedKey, key.Length);
    return paddedKey;
}