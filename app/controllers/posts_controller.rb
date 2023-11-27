class PostsController < ApplicationController
  before_action :is_matching_author, only: [:edit, :update, :destroy]
  def index
    @posts = Post.page(params[:page])
  end

  def show
    @post = Post.find(params[:id])
    @post_comment = PostComment.new
  end

  def new
    @post = Post.new
  end
  
  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    if @post.save
      redirect_to posts_path
    else
      render :new
    end
  end

  def edit
    @post = Post.find(params[:id])
  end
  
  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    redirect_to post_path(@post)
  end
  
  def destroy
    post = Post.find(params[:id])
    post.destroy
    redirect_to posts_path
  end
  
  private
  
  def post_params
    params.require(:post).permit(:creature_name, :caption, :image, :address, :latitude, :longitude)
  end
  
  def is_matching_author
    author = Post.find(params[:id]).user
    unless author == current_user
      redirect_to posts_path
    end
  end
  
end
