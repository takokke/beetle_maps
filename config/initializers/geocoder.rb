Geocoder.configure(
  lookup: :google,
  use_https: true,
  api_key: ENV["API_KEY"],
  units: :km
)
