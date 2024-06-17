using BLL.Bussiness;
using BLL.Bussiness.admin;
using BLL.Inerfaces;
using BLL.Inerfaces.admin;
using DAL.Helper;
using DAL.Interfaces;
using DAL.Interfaces.admin;
using DAL.Repository;
using DAL.Repository.admin;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Đọc cấu hình từ appsettings.json
var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .Build();

// Đăng ký AppSettings trong container DI
var appSettingsSection = configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);

// Lấy chuỗi khóa từ cấu hình
var appSettings = appSettingsSection.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.Key);

// Đăng ký dịch vụ xác thực JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = true
    };
});

// Đăng ký các dịch vụ khác trong container DI
builder.Services.AddTransient<ExcuteProcedure, ConnectToDatabase>();
builder.Services.AddTransient<ILoginRepository, loginRepository>();
builder.Services.AddTransient<ILoginBusiness, loginBusiness>();
builder.Services.AddTransient<IproductRepository, productRepository>();
builder.Services.AddTransient<IproductBusiness, productBusiness>();
builder.Services.AddTransient<IcategoryRepository, categoryRepository>();
builder.Services.AddTransient<IcategoryBusiness, categoryBusiness>();
builder.Services.AddTransient<IaccountBusiness, accountBusiness>();
builder.Services.AddTransient<IaccountRepository, accountRepository>();
builder.Services.AddTransient<Iuser_authorizationBusiness, user_authorizationBusiness>();
builder.Services.AddTransient<Iuser_authorizationRepository, user_authorizationRepository>();
builder.Services.AddTransient<Iadmin_catsBusiness, admin_catsBusniess>();
builder.Services.AddTransient<Iadmin_catsRepository, admin_catsRepository>();
builder.Services.AddTransient<Iadmin_unitsBusiness, admin_unitsBusiness>();
builder.Services.AddTransient<Iadmin_unitsRepository, admin_unitsRepository>();
builder.Services.AddTransient<Iadmin_supsBusiness, admin_supsBusiness>();
builder.Services.AddTransient<Iadmin_supsRepository, admin_supsRepository>();



builder.Services.AddAuthorization();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();


// Cấu hình HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Cấu hình CORS
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:3000") // Thay đổi domain của frontend 
        .AllowAnyHeader()
        .AllowAnyMethod();
});


app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();


app.Run();
