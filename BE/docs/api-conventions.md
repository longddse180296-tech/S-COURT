# S-COURT API Conventions

- Host API lives in `BE/src/API`.
- Business controllers live inside module folders, for example `BE/src/Modules/Booking/API/Controllers`.
- Controllers must stay thin: receive HTTP input, call Application use cases, and return responses.
- Controllers must not reference EF Core, DbContext, repository implementations, or another module directly.
- Application owns commands, queries, DTOs, validators, and interfaces.
- Domain owns entities, enums, value objects, events, and business rules.
- Infrastructure owns EF Core, Redis, external gateways, SignalR, FCM, and other technical implementations.
