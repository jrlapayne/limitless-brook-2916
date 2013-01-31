class SplitSliderFromQuestions < ActiveRecord::Migration
  def up
    remove_column :questions, :is_exponential
    remove_column :questions, :min
    remove_column :questions, :correct
    remove_column :questions, :max
    remove_column :questions, :units
    remove_column :questions, :is_decimal
  end

  def down
  end
end
