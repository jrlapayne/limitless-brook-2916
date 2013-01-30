class Task < ActiveRecord::Base
  attr_accessible :challenge_id, :user_id, :issue_id, :question_id, :time, :answer, :score, :answer_id
end
