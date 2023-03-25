from flask import Flask, render_template

app = Flask(__name__, static_folder="static")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/mvp.html")
def mvp():
    return render_template("mvp.html")

if __name__ == "__main__":
    app.run()
