import { useEffect, useState } from "react";

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/posts/");
        const data = await response.json();

        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Posts</h1>
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={`http://localhost:8000/post/${post.image}`}
                alt={post.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
