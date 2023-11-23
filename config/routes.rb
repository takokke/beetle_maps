Rails.application.routes.draw do
  devise_for :users
  root to: "homes#top"
  get '/about' => "homes#about"
  resources :posts
  resource :map, only: [:show] # 追記
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
