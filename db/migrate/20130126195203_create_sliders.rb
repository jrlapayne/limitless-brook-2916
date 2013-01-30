class CreateSliders < ActiveRecord::Migration
  def change
    create_table :sliders do |t|
      t.integer :question_id
      t.boolean :is_exponential
      t.float :min
      t.float :correct
      t.float :max
      t.string :units
      
      t.timestamps
    end
  end
end
