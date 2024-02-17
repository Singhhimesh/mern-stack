const Post = require('../models/Post');
const { request, response } = require('../routes/posts');

/**
 * Show the listing of the resources.
 *
 * @param {Object} request
 * @param {Object} response
 */
const index = async (request, response) => {
    try {
        const posts = await Post.find({ status: 1 });

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
 * Store the posts
 *
 * @param {Object} request
 * @param {Object} response
 */
const store = async (request, response) => {
    try {
        const post = new Post({
            title: request.body.title,
            slug: request.body.slug,
            status: request.body.status,
            description: request.body.description,
            image: request.file.filename,
        });

        const postData = await post.save();

        response.send({
            success: true,
            data: postData,
        });
    } catch (error) {
        response.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

const findBySlug = async (request, response) => {
    try {
        const postSlug = request.params.slug;

        const post = await Post.findOne({ slug: postSlug });

        if (!post) {
            return response.status(404).send({
                success: false,
                message: 'Post not found',
            });
        }

        response.send({
            success: true,
            data: post,
        });
    } catch(error) {
        response.status(400).send({
            success: false,
            message: error.message,
        });
    }
}

const findById = async (request, response) => {
    try {
        const postId = request.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return response.status(404).send({
                success: false,
                message: 'Post not found',
            });
        }

        response.send({
            success: true,
            data: post,
        });
    } catch(error) {
        response.status(400).send({
            success: false,
            message: error.message,
        });
    }
}

/**
 * Edit a post
 *
 * @param {Object} request
 * @param {Object} response
 */
const edit = async (request, response) => {
    try {
        const postId = request.params.id;

        const post = await Post.findById(postId);

        if (! post) {
            return response.status(404).send({
                success: false,
                message: 'Post not found',
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
            data: updatedPost,
        });
    } catch (error) {
        response.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    index,
    store,
    findById,
    findBySlug,
    edit
};
