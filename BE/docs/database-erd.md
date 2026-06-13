# S-COURT Database ERD

This file tracks the Code First database shape for the S-COURT backend.

Initial core entities from the SRS:

- Users
- Courts
- SubCourts
- TimeSlots
- Bookings
- Payments
- Matches
- MatchPlayers
- CreditLogs
- ManagerAssignments
- Notifications

Core relationships:

- Users 1-N Bookings
- Courts 1-N SubCourts
- SubCourts 1-N TimeSlots
- TimeSlots 1-1 Bookings
- Bookings 1-1 Payments
- Users N-N Matches through MatchPlayers
- Users 1-N CreditLogs
- Users(Manager) N-N Courts through ManagerAssignments
