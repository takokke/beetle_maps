class AddDiscoverDateToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :discover_date, :date
  end
end
