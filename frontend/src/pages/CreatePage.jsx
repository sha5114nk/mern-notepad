import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios.js";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, content });
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2-xl mb-4">Create new note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Type in your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="card-actions justify-end mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading || !title || !content}
                      value="Submit"
                    >
                      {loading ? "Creating..." : "Create"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
