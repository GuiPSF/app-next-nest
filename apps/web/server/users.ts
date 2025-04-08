export const getUser = async () => {
    const users = await fetch(`${process.env.API_URL}/users`);
    return users.json();
}