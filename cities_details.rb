require 'json'

file = File.read('get_all_cities.json')
data_hash = JSON.parse(file)
data_hash["cities"].each do |city|
  open("_cities/#{city}.md", 'w') { |f|
    f << "---\n"
    f << "city: #{city}\n"
    f << "layout: city\n"
    f << "---\n"
  }
end
