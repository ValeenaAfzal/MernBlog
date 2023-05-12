
import user from "../Model/user.js";

export const getProfile = async (request, response) => {
    try {
        const comments = await user.find({ postId: request.params.id });
        await response.status(200).json(comments);//send back to frontend
    } catch (error) {
        response.status(500).json(error)
    }
}
