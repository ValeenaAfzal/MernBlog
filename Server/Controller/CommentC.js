import Comment from '../Model/comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    console.log(request.params.id);
    try {
        const comments = await Comment.find({ postId: request.params.id });
        console.log(comments);
        response.status(200).json(comments);//send back to frontend
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        await comment.delete()
        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}