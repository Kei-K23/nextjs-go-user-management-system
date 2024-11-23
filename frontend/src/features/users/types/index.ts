export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type UserTableType = {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  created_at: Date;
};
