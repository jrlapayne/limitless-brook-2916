class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :issue_id
      t.string :title
      t.boolean :is_exponential
      t.integer :min
      t.integer :max
      t.integer :correct
      t.string :units
      t.text :url
      t.timestamps
    end
  end
end
