/** @jsx createVNode */
import { createVNode } from "../../lib";
import { globalStore } from "../../stores";

export const PostForm = () => {
  const { currentUser, loggedIn } = globalStore.getState;
  const { addPost } = globalStore.actions;
  const postingHandler = () => {
    const content = document.getElementById("post-content").value;
    addPost(content);
  };
  return (
    <div className="mb-4 bg-white rounded-lg shadow p-4">
      <textarea
        id="post-content"
        placeholder="무슨 생각을 하고 계신가요?"
        className="w-full p-2 border rounded"
      />
      <button
        id="post-submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={postingHandler}
      >
        게시
      </button>
    </div>
  );
};
