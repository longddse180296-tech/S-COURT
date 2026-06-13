using Microsoft.Extensions.DependencyInjection;
using SCourt.Modules.Identity.API.Controllers;
using SCourt.Modules.Identity.Application.Interfaces;
using SCourt.Modules.Identity.Infrastructure.Services;

namespace SCourt.Modules;

public static class ModuleRegistration
{
    public static IServiceCollection AddSCourtModules(this IServiceCollection services)
    {
        services.AddSingleton<IDevIdentityService, DevIdentityService>();
        return services;
    }

    public static IMvcBuilder AddSCourtModuleControllers(this IMvcBuilder mvcBuilder)
    {
        mvcBuilder.AddApplicationPart(typeof(AuthController).Assembly);
        return mvcBuilder;
    }
}
