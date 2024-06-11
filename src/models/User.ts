type User = {
  id: string;
  name?: string;
  email: string;
  password: string;
  role: Role;
};

enum Role {
  USER,
  ADMIN,
  PROJECT_MANAGER,
  DEVELOPER,
}
