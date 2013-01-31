class AddAnswerIdToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :answer_id, :integer
  end
end
