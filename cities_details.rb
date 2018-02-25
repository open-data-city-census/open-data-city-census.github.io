require 'json'

def write_if_not_exists(filename, &content_block)
  unless File.file?(filename)
    puts "write file #{filename}"
    open(filename, 'w') { |f|
      content_block.call(f)
    }
  end
end

file = File.read('get_all_cities.json')
data_hash = JSON.parse(file)
data_hash["cities"].each do |city|
  city_detail_site = "_cities/#{city}.md"
  write_if_not_exists(city_detail_site) do |f|
      f << "---\n"
      f << "city: #{city}\n"
      f << "layout: city\n"
      f << "---\n"
  end
  city_stats = "_data/city_stats/#{city}.csv"
  write_if_not_exists(city_stats) do |f|
      f << ""
  end
  city_datasets = "_data/city_stats/datasets/#{city}.json"
  write_if_not_exists(city_datasets) do |f|
      f << ""
  end
end
