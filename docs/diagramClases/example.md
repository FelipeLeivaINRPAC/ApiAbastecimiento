# 📦 Class Diagram - User Management System

---

## 🧍 Class: User

**Attributes:**

- `- id: int`
- `- rut: string`
- `- dv: string`
- `- name: string`
- `- lastname: string`
- `- email: string`
- `- password: string`
- `- isActive: bool`
- `- createdAt: datetime`
- `- updatedAt: datetime`

**Methods:**

- `+ login(): bool`
- `+ logout(): void`

---

## 🎓 Class: Student ⬅️ extends User

**Attributes:**

- `- studentNumber: string`
- `- averageMark: float`

**Methods:**

- `+ isEligibleToEnroll(): bool`
- `+ getSeminarsTaken(): List<Seminar>`

---

## 👨‍🏫 Class: Professor ⬅️ extends User

**Attributes:**

- `- salary: float`

**Methods:**

- `+ getAssignedCourses(): List<Course>`

---

## 🏠 Class: Address

**Attributes:**

- `- street: string`
- `- city: string`
- `- state: string`
- `- postalCode: string`
- `- country: string`

**Methods:**

- `+ validate(): bool`
- `+ outputAsLabel(): string`

---

## 🔁 Relationships

- `User 1 ---- 0..1 Address`  
  (A user may optionally have an address)

- `Student ⬅️ inherits User`

- `Professor ⬅️ inherits User`
