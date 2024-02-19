import Category from "../models/Category.js";

/**
 * Store the posts
 *
 * @param {Object} request
 * @param {Object} response
 */
const store = async (request, response) => {
  try {
    const post = new Category({
      title: request.body.title,
      slug: request.body.slug,
      status: request.body.status,
      image: request.file.filename,
    });

    const postData = await post.save();

    response.send({
      success: true,
      message: 'Category has been stored successfully.',
      data: postData,
    });
  } catch (error) {
    response.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Show the listing of the resources.
 *
 * @param {Object} request
 * @param {Object} response
 */
const index = async (request, response) => {
  try {
    const posts = await Category.find();

    response.send({
      success: true,
      data: posts,
    });
  } catch (error) {
    response.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Edit a post
 *
 * @param {Object} request
 * @param {Object} response
 */
const edit = async (request, response) => {
  try {
    const postId = request.params.id;

    const post = await Category.findById(postId);

    if (!post) {
      return response.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    post.title = request.body.title || post.title;
    post.slug = request.body.slug || post.slug;
    post.status = request.body.status || post.status;
    post.description = request.body.description || post.description;

    if (request.file) {
      post.image = request.file.filename;
    }

    const updatedPost = await post.save();

    response.send({
      success: true,
      message: 'Category has been edited successfully.',
      data: updatedPost,
    });
  } catch (error) {
    response.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export { store, index, edit };
