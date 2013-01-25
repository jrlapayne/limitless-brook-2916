class CreateAnswers < ActiveRecord::Migration
  def change
    add_column :questions, :is_slider, :boolean
    
    create_table :answers do |t|
      t.integer :question_id
      t.string :content
      t.boolean :is_correct, default: false
      
      t.timestamps
    end
  end
end
