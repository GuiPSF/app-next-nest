export const getUser = async () => {
  const users = await fetch("http://localhost:3333/users", {
    next: { revalidate: 0 },
  });
  if (!users.ok) {
    throw new Error(`Failed to fetch users: ${users.status}`);
  }
  return users.json();
};
