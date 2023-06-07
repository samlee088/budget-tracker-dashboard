import { Schema } from 'mongoose';

const expenseSchema = new Schema({
    name: 
        {
            type: String,
            required: true,
        }
    ,
    company: { type: String},
    frequency: {
        type: String,
        required: true,
    },
    expectedPaymentDate: {
        type: Date,
        required: true,
    },
    expectedPaymentAmount: {
        type: Number,
        required: true,
    },
    actualPaymentDate: {
        type: Date,
        required: true,
    },
    actualPaymentAmount: {
        type: Number,
        required: true,
    }
   

})

export default expenseSchema;



