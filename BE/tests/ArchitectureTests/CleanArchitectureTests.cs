using System.Reflection;
using SCourt.Modules;
using Xunit;

namespace SCourt.ArchitectureTests;

public sealed class CleanArchitectureTests
{
    private static readonly Assembly ModulesAssembly = typeof(ModuleRegistration).Assembly;

    public static TheoryData<string, string[]> LayerDependencyRules => new()
    {
        {
            ".Domain.",
            new[]
            {
                ".Application.",
                ".Infrastructure.",
                ".API.",
                "Microsoft.AspNetCore",
                "Microsoft.EntityFrameworkCore",
            }
        },
        {
            ".Application.",
            new[]
            {
                ".Infrastructure.",
                ".API.",
                "Microsoft.AspNetCore",
                "Microsoft.EntityFrameworkCore",
            }
        },
        {
            ".API.",
            new[]
            {
                ".Infrastructure.",
                "Microsoft.EntityFrameworkCore",
            }
        },
    };

    [Theory]
    [MemberData(nameof(LayerDependencyRules))]
    public void Module_layers_must_not_reference_forbidden_namespaces(
        string layerMarker,
        string[] forbiddenNamespaces)
    {
        var offenders = GetModuleTypes()
            .Where(type => type.FullName?.Contains(layerMarker, StringComparison.Ordinal) == true)
            .SelectMany(type => GetReferencedTypes(type)
                .Where(dependency => IsForbiddenDependency(dependency, forbiddenNamespaces))
                .Select(dependency => $"{type.FullName} -> {dependency.FullName}"))
            .Distinct()
            .Order()
            .ToArray();

        AssertNoOffenders(offenders);
    }

    [Fact]
    public void Modules_must_not_reference_other_modules_directly()
    {
        var offenders = GetModuleTypes()
            .SelectMany(type =>
            {
                var sourceModule = GetModuleName(type);
                if (sourceModule is null)
                {
                    return Array.Empty<string>();
                }

                return GetReferencedTypes(type)
                    .Select(dependency => new
                    {
                        Type = type,
                        Dependency = dependency,
                        TargetModule = GetModuleName(dependency),
                    })
                    .Where(item =>
                        item.TargetModule is not null &&
                        item.TargetModule != sourceModule)
                    .Select(item =>
                        $"{item.Type.FullName} -> {item.Dependency.FullName}");
            })
            .Distinct()
            .Order()
            .ToArray();

        AssertNoOffenders(offenders);
    }

    private static IEnumerable<Type> GetModuleTypes() =>
        ModulesAssembly
            .GetTypes()
            .Where(type =>
                type.FullName?.StartsWith("SCourt.Modules.", StringComparison.Ordinal) == true &&
                type != typeof(ModuleRegistration));

    private static bool IsForbiddenDependency(Type dependency, IReadOnlyCollection<string> forbiddenNamespaces)
    {
        var fullName = dependency.FullName;
        if (fullName is null)
        {
            return false;
        }

        return forbiddenNamespaces.Any(forbidden =>
            forbidden.StartsWith(".", StringComparison.Ordinal)
                ? fullName.StartsWith("SCourt.Modules.", StringComparison.Ordinal) &&
                  fullName.Contains(forbidden, StringComparison.Ordinal)
                : fullName.StartsWith(forbidden, StringComparison.Ordinal));
    }

    private static string? GetModuleName(Type type)
    {
        var ns = type.Namespace;
        if (ns is null || !ns.StartsWith("SCourt.Modules.", StringComparison.Ordinal))
        {
            return null;
        }

        var parts = ns.Split('.');
        return parts.Length >= 3 ? parts[2] : null;
    }

    private static IEnumerable<Type> GetReferencedTypes(Type type)
    {
        var referencedTypes = new List<Type?>
        {
            type.BaseType,
        };

        referencedTypes.AddRange(type.GetInterfaces());
        referencedTypes.AddRange(type.GetFields(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
            .Select(field => field.FieldType));
        referencedTypes.AddRange(type.GetProperties(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
            .Select(property => property.PropertyType));
        referencedTypes.AddRange(type.GetConstructors(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic)
            .SelectMany(ctor => ctor.GetParameters().Select(parameter => parameter.ParameterType)));
        referencedTypes.AddRange(type.GetMethods(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
            .Where(method => !method.IsSpecialName)
            .Select(method => method.ReturnType));
        referencedTypes.AddRange(type.GetMethods(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
            .Where(method => !method.IsSpecialName)
            .SelectMany(method => method.GetParameters().Select(parameter => parameter.ParameterType)));

        return referencedTypes
            .Where(referencedType => referencedType is not null)
            .SelectMany(ExpandType)
            .Where(referencedType =>
                referencedType.Assembly != typeof(object).Assembly &&
                referencedType != type)
            .Distinct();
    }

    private static IEnumerable<Type> ExpandType(Type? type)
    {
        if (type is null)
        {
            yield break;
        }

        if (type.IsGenericType)
        {
            foreach (var argument in type.GetGenericArguments().SelectMany(ExpandType))
            {
                yield return argument;
            }
        }

        if (type.IsArray)
        {
            foreach (var elementType in ExpandType(type.GetElementType()))
            {
                yield return elementType;
            }
        }

        yield return type;
    }

    private static void AssertNoOffenders(IReadOnlyCollection<string> offenders)
    {
        Assert.True(
            offenders.Count == 0,
            "Forbidden architecture dependencies found:" +
            Environment.NewLine +
            string.Join(Environment.NewLine, offenders));
    }
}
