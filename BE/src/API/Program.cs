using Microsoft.OpenApi.Models;
using SCourt.Modules;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSCourtModules();
builder.Services.AddControllers().AddSCourtModuleControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "S-COURT API",
        Version = "v1",
        Description = "API xác thực và quản lý hồ sơ cho Người chơi và Chủ sân.",
    });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "Token",
        In = ParameterLocation.Header,
        Description = "Nhập access token nhận được sau khi đăng nhập.",
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer",
                },
            },
            Array.Empty<string>()
        },
    });
});
builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration
        .GetSection("Cors:AllowedOrigins")
        .Get<string[]>() ?? ["http://localhost:5173", "http://localhost:3000"];

    options.AddDefaultPolicy(policy =>
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "S-COURT API v1");
    options.RoutePrefix = "swagger";
    options.DocumentTitle = "S-COURT API";
});
app.UseCors();
app.MapGet("/api/health", () => Results.Ok(new
{
    status = "ok",
    service = "SCourt.API",
    timestamp = DateTimeOffset.UtcNow,
}));
app.MapControllers();

app.Run();
