class PostsController < ApplicationController
  before_action :is_matching_author, only: [:edit, :update, :destroy]
  def index
    respond_to do |format|
      format.html do
        @posts = Post.page(params[:page])
      end
      format.json do
        @posts = Post.all
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        @post = Post.find(params[:id])
        @post_comment = PostComment.new
      end
      format.json do
        @post = Post.find(params[:id])
      end
    end
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    if @post.save
      flash[:notice] = "You have created post successfully."
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
    if @post.update(post_params)
      flash[:notice] = "You have updated post successfully."
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:creature_name, :caption, :image, :address, :latitude, :longitude, :discover_date)
  end

  def is_matching_author
    author = Post.find(params[:id]).user
    unless author == current_user
      redirect_to posts_path
    end
  end

end
