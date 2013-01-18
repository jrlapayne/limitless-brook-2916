class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :challenge_id
      t.integer :user_id
      t.integer :issue_id
      t.integer :question_id
      t.float :time
      t.integer :answer
      t.integer :score
      t.timestamps
    end
  end
end
