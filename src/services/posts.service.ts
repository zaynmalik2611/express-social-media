import prisma from "./prisma";
const getAll = async () => {
  const posts = await prisma.post.findMany();
  return { posts };
};

const postPost = async () => {
  const createdPost = await prisma.post.create({
    data: {
      title: "",
      authorId: req.user.id,
    },
  });
};

export { getAll };
