using Genie.Router, Genie, Genie.Renderer.Html, Genie.Requests

route("/") do
  serve_static_file("index.html")
end

# create form
form = """
<form action="/julia-app" method="POST" enctype="multipart/form-data">
<input type="text" name="name" value="" placeholder="what is your name?" />
<input type="submit" value="Greet"/>
</form>
"""

route("/julia-app") do
  html(form)
end

route("/julia-app", method = POST) do 
  "Good Morning $(postpayload(:name, "Anon"))"
end
