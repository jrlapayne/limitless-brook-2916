class MakeAnswerValuesFloat < ActiveRecord::Migration
  def up
    change_column :questions, :min, :float
    change_column :questions, :max, :float
    change_column :questions, :correct, :float
    
    change_column :challenges, :is_finished, :boolean, default: false
    change_column :challenges, :is_sent, :boolean, default: false
    change_column :challenges, :challenger_score, :integer, default: 0
    change_column :challenges, :user_score, :integer, default: 0
    
    change_column :tasks, :answer, :float
  end

  def down
  end
end
