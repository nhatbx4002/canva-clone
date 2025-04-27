const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
    UserId: String,
    name:String,
    canvasData: String,
    width: Number,
    height: Number,
    category: String,
    createdAt:  {
        type: Date,
        default: Date.now()
    },
    createdAt:  {
        type: Date,
        default: Date.now()
    }
})

const Design = mongoose.models.Design || mongoose.model("Design", DesignSchema);