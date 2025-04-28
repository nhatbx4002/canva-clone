const Design = require("../models/Design");


exports.getUserDesigns = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];

        const designs = await Design.find({ userId: userId }).sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            data: designs,
        });
    } catch (e) {
        console.error('Error fetching user designs:', e);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch designs.'
        });
    }
};

exports.getUserDesignsByID = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const designId = req.params.id;

        const design = await Design.findOne({ _id: designId, userId: userId });

        if (!design) {
            return res.status(404).json({
                success: false,
                message: 'Design not found!'
            });
        }

        return res.status(200).json({
            success: true,
            data: design,
        });
    } catch (e) {
        console.error('Error fetching design by ID:', e);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch design by ID.'
        });
    }
};

exports.saveDesign = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { title, content, thumbnail, isPublic } = req.body;

        const design = new Design({
            userId,
            title,
            content,
            thumbnail,
            isPublic
        });

        await design.save();

        return res.status(201).json({
            success: true,
            data: design
        });
    } catch (e) {
        console.error('Error saving design:', e);
        res.status(500).json({
            success: false,
            message: 'Failed to save design.'
        });
    }
};

exports.updateDesign = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const designId = req.params.id;
        const { title, content, thumbnail, isPublic } = req.body;

        const design = await Design.findOneAndUpdate(
            { _id: designId, userId: userId },
            { title, content, thumbnail, isPublic },
            { new: true }
        );

        if (!design) {
            return res.status(404).json({
                success: false,
                message: 'Design not found!'
            });
        }

        return res.status(200).json({
            success: true,
            data: design
        });
    } catch (e) {
        console.error('Error updating design:', e);
        res.status(500).json({
            success: false,
            message: 'Failed to update design.'
        });
    }
};

exports.deleteDesign = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const designId = req.params.id;

        const design = await Design.findOneAndDelete({ _id: designId, userId: userId });

        if (!design) {
            return res.status(404).json({
                success: false,
                message: 'Design not found!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Design deleted successfully'
        });
    } catch (e) {
        console.error('Error deleting design:', e);
        res.status(500).json({
            success: false,
            message: 'Failed to delete design.'
        });
    }
};


