class Question < ActiveRecord::Base
  attr_accessible :issue_id, :title, :is_exponential, :min, :max, :correct, :units, :url
end