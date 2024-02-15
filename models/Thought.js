const {Schema, Types} =require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
       },
       reactionBody:{
        type:String,
        required: true,
        maxlength: 280
       },
       username:{
        type: String,
        required:true
       },
       createdAt:{
        type:Date,
        default: Date.now
       }
    }
);
reactionSchema.virtual('formattedCreatedAt').get(function(){
    return this.createdAt.toISOString();
});



const thoughtSchema = new Schema(
    {
        thoughtId:{
            type: String,
            required: true,
            maxlength: 256,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required: true,

        },
        reactions:[reactionSchema]
        
    }
)
module.exports = thoughtSchema;