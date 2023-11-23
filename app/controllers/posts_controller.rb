class PostsController < ApplicationController
  def index
    
  end

  def show
    
  end

  def new
    @post = Post.new
  end
  
  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    @post.save
    redirect_to posts_path
  end

  def edit
    
  end
  
  private
  
  def post_params
    params.require(:post).permit(:insect_name, :caption, :image, :latitude, :longitude)
  end
end
