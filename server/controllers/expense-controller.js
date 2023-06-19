import { User, Expense } from '../models/index.js';



export const getAllExpenses = async (req, res) => {
  try{

    const userId = req.user._id; 
    const user = await User.findById(userId);
    const expenses = await Expense.find({ _id: { $in: user.savedExpenses } });


    res.status(200).json(expenses);
    

  } catch (error) {
    console.error(error);
    res.status(200).json(error);
  }
}



export const addExpense = async (req, res) => {
    try {
      const expense = await Expense.create({
        name: req.body.name,
        frequency: req.body.frequency,
        expectedPaymentDate: req.body.expectedPaymentDate,
        expectedPaymentAmount: req.body.expectedPaymentAmount,
      });
  
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { savedExpenses: expense._id } }
      );
  
      return res.json(expense);
    } catch (error) {
      console.error(error);
      res.status(200).json(error);
    }
};

 




