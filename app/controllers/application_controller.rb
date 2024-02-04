class ApplicationController < ActionController::Base
  before_action :authenticate_user!, except: [:top, :index]
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  
  # フラッシュメッセージ用
  add_flash_types :secondary, :success, :danger, :warning, :info, :light, :dark

  # ログイン後のページ遷移
  def after_sign_in_path_for(resource)
    posts_path
  end

  # ログアウト後のページ遷移
  def after_sign_out_path_for(resource)
    about_path
  end

  protected
   
  # deviseのストロングパラメータ
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email])
  end
end
