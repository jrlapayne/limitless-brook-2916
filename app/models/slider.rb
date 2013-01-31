class Slider < ActiveRecord::Base
  attr_accessible :question_id, :is_exponential, :min, :correct, :max, :units
end
