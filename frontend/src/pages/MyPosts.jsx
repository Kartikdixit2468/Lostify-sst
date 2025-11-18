import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get('https://lostify-x7te.onrender.com/api/posts/my-posts');
      setPosts(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await axios.delete(`https://lostify-x7te.onrender.com/api/posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete post');
    }
  };

  const handleResolve = async (id) => {
    try {
      await axios.put(`https://lostify-x7te.onrender.com/api/posts/${id}`, { status: 'resolved' });
      toast.success('Post marked as resolved');
      fetchMyPosts();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to resolve post');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-heading font-bold text-charcoal dark:text-white mb-8">My Posts</h1>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 card">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-heading font-semibold text-charcoal dark:text-white mb-2">No Posts Yet</h3>
          <p className="text-charcoal/60 dark:text-white/60 mb-6">
            You haven't posted anything yet. Start by posting a lost or found item!
          </p>
          <Link to="/create" className="btn-primary inline-block">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="card p-6 fade-in">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-heading font-semibold text-charcoal dark:text-white">{post.title}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      post.type === 'lost' ? 'bg-lost text-white' : 'bg-found text-white'
                    }`}>
                      {post.type.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      post.status === 'active' ? 'bg-accent text-navy' : 'bg-charcoal/60 text-white'
                    }`}>
                      {post.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-charcoal/70 dark:text-white/80 mb-2">{post.description}</p>
                  <div className="text-sm text-charcoal/60 dark:text-white/60 space-y-1">
                    <p>📍 {post.location}</p>
                    <p>📂 {post.category}</p>
                    <p>📞 {post.contactNumber}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {post.status === 'active' && (
                    <button
                      onClick={() => handleResolve(post.id)}
                      className="px-4 py-2 bg-found text-white rounded-lg hover:bg-green-600 text-sm font-heading font-semibold transition-all"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 bg-lost text-white rounded-lg hover:bg-lost/90 text-sm font-heading font-semibold transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
