class RenameInsectNameColumnToPosts < ActiveRecord::Migration[6.1]
  def change
    rename_column :posts, :insect_name, :creature_name
  end
end
