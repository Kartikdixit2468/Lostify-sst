const Database = require("@replit/database");
const db = new Database();

const DB_KEYS = {
  USERS: 'users',
  POSTS: 'posts',
  POST_COUNTER: 'post_counter'
};

async function getUser(username) {
  const usersKey = `${DB_KEYS.USERS}:${username}`;
  return await db.get(usersKey);
}

async function createUser(userData) {
  const usersKey = `${DB_KEYS.USERS}:${userData.username}`;
  await db.set(usersKey, userData);
  return userData;
}

async function getPost(postId) {
  const postKey = `${DB_KEYS.POSTS}:${postId}`;
  return await db.get(postKey);
}

async function getAllPosts() {
  const postKeys = await db.list(DB_KEYS.POSTS);
  const posts = [];
  for (const key of postKeys) {
    const post = await db.get(key);
    if (post) posts.push(post);
  }
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function createPost(postData) {
  let counter = await db.get(DB_KEYS.POST_COUNTER) || 0;
  counter++;
  await db.set(DB_KEYS.POST_COUNTER, counter);
  
  const postId = `post_${Date.now()}_${counter}`;
  const post = {
    ...postData,
    id: postId,
    createdAt: new Date().toISOString(),
    status: 'active'
  };
  
  const postKey = `${DB_KEYS.POSTS}:${postId}`;
  await db.set(postKey, post);
  return post;
}

async function updatePost(postId, updateData) {
  const postKey = `${DB_KEYS.POSTS}:${postId}`;
  const existingPost = await db.get(postKey);
  if (!existingPost) return null;
  
  const updatedPost = { ...existingPost, ...updateData };
  await db.set(postKey, updatedPost);
  return updatedPost;
}

async function deletePost(postId) {
  const postKey = `${DB_KEYS.POSTS}:${postId}`;
  await db.delete(postKey);
  return true;
}

async function getUserPosts(username) {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.user === username);
}

module.exports = {
  getUser,
  createUser,
  getPost,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getUserPosts
};
