$stdout.sync = true

use Rack::Static,
  :urls => ["/index.html", "/about.html","/contact.html", "/FAQ.html", "/m","/css", "/js", "/img", "/font", "/markets", "/fundraisers", "/spec"],
  :root => "."

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('index.html', File::RDONLY)
  ]
}

