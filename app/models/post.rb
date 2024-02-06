class Post < ApplicationRecord
  has_one_attached :image
  belongs_to :user

  has_many :post_comments, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :creature_name, presence: true
  validates :image, presence: true
  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :discover_date, presence: true

  def get_image(width, height)
    unless image.attached?
      file_path = Rails.root.join('app/assets/images/rails-image.png')
      image.attach(io: File.open(file_path), filename: 'default-image.png', content_type: 'image/png')
    end
    # image.variant(resize_to_limit: [width, height]).processed
    image.variant(gravity: :center, resize:"300x500^",crop:"#{width}x#{height}+0+0").processed
  end

  def favorited_by?(user)
    favorites.exists?(user_id: user.id)
  end
end
