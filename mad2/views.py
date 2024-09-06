from flask import render_template_string
def create_view(app):
    @app.route('/')
    def home():
        return render_template_string(
            """
                 <h1> Hello world </h1>
                 """
        )
    