import { Schema, model } from 'mongoose';

const expenseSchema = new Schema({
    name: 
        {
            type: String,
            required: true,
        }
    ,
    frequency: {
        type: String,
        required: true,
    },
    expectedPaymentDate: {
        type: Number,
        required: true,
    },
    expectedPaymentAmount: {
        type: Number,
        required: true,
    },
    actualPaymentDate: {
        type: Date,
        required: false,
    },
    actualPaymentAmount: {
        type: Number,
        required: false,
    }
   

})

const Expense = model('Expense', expenseSchema);

export default Expense;



