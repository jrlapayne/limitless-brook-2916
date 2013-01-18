class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.integer :issue_id
      t.string :question_ids
      t.integer :challenger_id
      t.integer :user_id
      t.integer :challenger_score
      t.integer :user_score
      t.integer :winner_id
      t.boolean :is_finished
      t.boolean :is_sent
      t.timestamps
    end
  end
end
