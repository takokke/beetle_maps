json.data do
  json.items do
    json.array!(@posts) do |post|
      json.id post.id
      json.user do
        json.name post.user.name
        json.image url_for(post.user.get_profile_image(80, 80))
      end
      json.image url_for(post.get_image(200, 200))
      json.creature_name post.creature_name
      json.caption post.caption
      json.address post.address
      json.latitude post.latitude
      json.longitude post.longitude
    end
  end
end