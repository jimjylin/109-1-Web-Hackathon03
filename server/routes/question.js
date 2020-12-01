import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find()
      .sort({ _id: 1 })
      .exec((err, res1) => {
        if (err) {
          res.status(403).send({ message : 'error', contents: [] })
        }
        res.status(200).send({ message : 'success', contents: res1 })

        // initialize app with existing messages
      })
}

exports.CheckAns = async (req, res) => {
  const client_ans = req.body.params.ans
  var client_score = 0
  Answer.find()
      .sort({ _id: 1 })
      .exec((err, res1) => {
        if (err) {

          res.status(403).send({ message : 'error', score: -1 })
        }
        
        for(let i = 0;i < client_ans.length;i++){
          if(client_ans[i] == res1[i].answer) client_score+=1
        }
        res.status(200).send({ message : 'success', score: client_score })
        // initialize app with existing messages
      })
  
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
}
