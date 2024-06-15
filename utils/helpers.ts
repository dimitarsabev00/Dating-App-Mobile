export const generateId = (id_1: number, id_2: number) => {
  if (id_1 > id_2) {
    return id_1 + id_2;
  } else {
    return id_2 + id_1;
  }
};

export const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};
