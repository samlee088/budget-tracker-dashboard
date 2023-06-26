import { User, Expense } from '../models/index.js';
import moment from 'moment';

export const getAllExpenses = async (req, res) => {
  try{

    const userId = req.user._id; 
    const user = await User.findById(userId);
    const expenses = await Expense.find({ _id: { $in: user.savedExpenses } }).lean();

    res.status(200).json(expenses);
    

  } catch (error) {
    console.error(error); 
    res.status(200).json(error);
  }
}



export const addExpense = async (req, res) => {
    try {

      console.log(req.body);
      const currentDate = moment();
      const futureDate = currentDate.add(6, 'months');

      let endDate = moment(req.body.expectedPaymentDate);

      while(endDate < futureDate) {

        const expense = await Expense.create({
          name: req.body.name,
          frequency: req.body.frequency,
          expectedPaymentDate: endDate,
          expectedPaymentAmount: req.body.expectedPaymentAmount,
        });

        await User.findOneAndUpdate(
          { _id: req.user._id },
          { $addToSet: { savedExpenses: expense._id } }
        );

        switch(req.body.frequency) {
          case 'once' : 
            endDate = endDate.add(11, 'months')
            break;
          case 'daily' :
            endDate = endDate.add(1, 'day')
            break;
          case 'weekly' :
            endDate = endDate.add(1, 'week')
            break;
          case 'bi-weekly' :
            endDate = endDate.add(2, 'weeks')
            break;
          case 'monthly' :
            endDate = endDate.add(1, 'month')
            break;
          case 'semi-annual' :
            endDate = endDate.add(6, 'months')
            break;
          default:
            break;
        }
      }

      return res.json(req.body);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
};

 
export const addPayment = async ( req, res ) => {

    try{
      console.log(req.body)

      const expenseUpdate = 
        await Expense.findOneAndUpdate(
          {_id: req.body._id},
          {  $set: { actualPaymentAmount: req.body.actualPaymentAmount, actualPaymentDate: req.body.actualPaymentDate }}
        )
        
      res.status(200).json(expenseUpdate);

    } catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
}


