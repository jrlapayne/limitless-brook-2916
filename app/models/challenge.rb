class Challenge < ActiveRecord::Base
  attr_accessible :issue_id, :question_ids, :challenger_id, :user_id, :challenger_score, :user_score, :winner_id,
                  :is_finished, :is_sent
end
