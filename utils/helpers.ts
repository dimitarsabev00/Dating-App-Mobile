export const generateId = (id_1: number, id_2: number) => {
  if (id_1 > id_2) {
    return id_1 + id_2;
  } else {
    return id_2 + id_1;
  }
};
