import prisma from "./prisma";
const getAll = async () => {
  const posts = await prisma.post.findMany();
  return { posts };
};

export { getAll };
