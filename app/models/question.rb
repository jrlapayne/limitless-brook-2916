class Question < ActiveRecord::Base
  attr_accessible :issue_id, :title, :is_exponential, :min, :max, :correct, :units, :url, :is_decimal, :is_slider
end
