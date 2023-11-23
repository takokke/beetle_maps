class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :insect_name
      t.text :caption
      t.integer :user_id
      t.float :latitude, default: 0.0
      t.float :longitude, default: 0.0

      t.timestamps
    end
  end
end
