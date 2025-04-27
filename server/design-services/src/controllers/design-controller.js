const Design = require("../models/Design");

exports.getUserDesigns = async (req,res) => {
    try{
        const userId = req.user.userId;

        const designs = await Design.find({userId: userId}).sort({updateAt: -1});

        return res.status(200).json({
            success: true,
            data: designs,
        });
    }catch(e){
        console.error('Error fetching user designs.' , e);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch designs.'
        });
    }
}

exports.getUserDesignsByID = async (req,res) => {
    try{
        const userId = req.user.userId;
        const designId = req.params.id;

        const design = await Design.findOne({_id: designId , userId: userId});

        if(!design){
            res.status(404).json({
                success: false,
                message: 'Design not found!'
            })
        }

        return res.status(200).json({
            success: true,
            data: designs,
        });
    }catch(e){
        console.error('Error fetching user designs.' , e);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch designs by ID.'
        });
    }
}

exports.saveDesign = async (req,res) => {
    try{
        const userId = req.user.userId;
        const {designId , name , canvasData, width , height , category} = req.body;

        if(designId){
            const design = await Design.findOne ({_id: designId , userId: userId});
            if(!design){
                return res.status(400).json({
                    success: false,
                    message: 'Design not found!'
                });
            }

            if(name) design.name = name;
            if(canvasData) design.canvasData = canvasData;
            if(width) design.width = width;
            if(height) design.height = height;
            if(category) design.category = category;

            design.updateAt = Date.now();
            const updatedDesign = await design.save();

            return res.status(200).json({
                success: true,
                message: 'Design saved successfully.',
                data: updatedDesign,
            })
        }
        else {
            const newDesign = new Design({
                userId: userId,
                name: name || 'Untitled Design',
                width : width,
                height : height,
                canvasData: canvasData,
                category: category,
            })

            const saveDesign = await newDesign.save();
            return res.status(200).json({
                success: true,
                message: 'Design saved successfully.',
                data: saveDesign,
            })

        }
    }catch(e){
        console.error('Error while saving designs.' , e);
        res.status(500).json({
            success: false,
            message: 'Failed to save designs .'
        });
    }
}

exports.deleteDesign = async (req,res) => {
    try{
        const userId = req.user.userId;
        const designId = req.params.id;
        const design = await Design.findOne ({_id: designId , userId: userId});
        if(designId) {
            const design = await Design.findOne({_id: designId, userId: userId});
            if (!design) {
                return res.status(400).json({
                    success: false,
                    message: 'Design not found!'
                });
            }
        }
        await Design.deleteOne({_id: designId, userId: userId});
        return res.status(200).json({
            success: true,
            message: 'Design deleted successfully.',
        })
    }catch(e){
        console.error('Error while deleting designs.' , e);
        res.status(500).json({
            success: false,
            message: 'Failed to delete designs .'
        });
    }
}


