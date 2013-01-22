class AddIsDecimalToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :is_decimal, :boolean
  end
end
