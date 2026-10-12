## 🧩 Final Prisma Model (Combined User + Lead)

```prisma
model Lead {
  id               String   @id @default(cuid())       // ✅ unique ID (better than auto increment for distributed systems)
  name             String
  email            String
  phone            String
  address          String?
  preferredContact String?                           // "Phone" | "Email"
  
  // Services offered by your company
  serviceType      ServiceType                        // enum defined below
  otherService     String?                            // if user selects "Other"
  
  description      String?
  
  // Tracks employees who interacted with the lead
  assignedTo       String[] @default([])               // ✅ array of employee IDs (as strings)
  
  status           String   @default("New")            // "New" | "Assigned" | "Closed"
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

---

## 🎯 Enum for Service Types

You can define an enum in Prisma to make your service list clean and type-safe:

```prisma
enum ServiceType {
  ACA
  FE
  SSDI
  MEDICARE
  AUTO_INSURANCE
  OTHER
}
```

So your `serviceType` field will accept one of these six.

---

## 💡 Explanation of Each Choice

| Field                           | Why It’s Done This Way                                                                                                                       |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **id: String @default(cuid())** | `cuid()` (Prisma’s built-in nano-safe ID) is better than `autoincrement()` — unique, collision-resistant, good for distributed environments. |
| **serviceType: enum**           | Gives strong typing, easy validation, and prevents inconsistent strings.                                                                     |
| **otherService**                | Used only if `serviceType = OTHER`.                                                                                                          |
| **assignedTo: String[]**        | Lets multiple employees work on the same lead (your plan). You can later switch to a relation if needed.                                     |
| **status**                      | Starts as `New` and can be updated by employees.                                                                                             |

---

## 🧱 Migration Command

After updating your `schema.prisma`, run:

```bash
npx prisma migrate dev --name init_lead_model
```

---

