import os
import requests

from flask import Flask, jsonify, session, render_template, redirect, request, url_for
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask_session import Session

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret'
app.config['SESSION_TYPE'] = 'filesystem'
socketio = SocketIO(app)


@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route("/chat", methods=['GET', 'POST'])
def chat():
    if (request.method == 'POST'):
        username = request.form.get('username')
        channel = request.form.get('channel')
        # almacenar la info en session
        session['username'] = username
        session['room'] = channel
        return render_template("chat.html", session=session)
    else:
        if (session.get('username') is not None):
            return render_template("chat.html", session=session)
        else:
            return redirect(url_for('index'))


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

@socketio.on('message')
def message(data):
    print(f"\n\n{data}\n\n")
    send(data)


if __name__ == '__main__':
    socketio.run(app, debug=True)
