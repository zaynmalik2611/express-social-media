import prisma from "./prisma";
const getAll = async () => {
  const posts = await prisma.post.findMany();
  return { posts };
};

const makePost = async (email: string, title: string, body: string) => {
  const createdPost = await prisma.post.create({
    data: {
      title: title,
      body: body,
      author: {
        connect: {
          email: email,
        },
      },
    },
  });
  return { createdPost };
};

export { getAll, makePost };
