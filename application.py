import os
import requests
from collections import deque
from time import localtime, asctime

from flask import Flask, jsonify, session, render_template, redirect, request, url_for
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask_session import Session

from helpers import login_required

app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret'
app.config['SESSION_TYPE'] = 'filesystem'
socketio = SocketIO(app)

socketio = SocketIO(app, cors_allowed_origin="*")

users = []
channels = []
canalmensajes = dict()


@app.route("/")
@login_required
def index():
    return render_template('index.html', channels=channels)


@app.route("/login", methods=['GET', 'POST'])
def login():

    session.clear()

    username = request.form.get("username")
    if request.method == "POST":
        if username in users:
            return "username already exists"
        users.append(username)
        session['username'] = username
        # Remember the user session on a cookie if the browser is closed.
        session.permanent = True

        return redirect("/")
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""
    usuario = session['username']
    # Forget any user_id
    session.clear()

    try:
        users.remove(f"{usuario}")
    except ValueError:
        pass
    # Redirect user to login form
    return redirect("/")


@app.route("/create", methods=['POST'])
def create():

    # obtener el nombre del canal desde el formulario
    newchannel = request.form.get("channel")

    if newchannel in channels:
        return ("that channel already exists!")

    # Agregar el canal a la lista global e canales
    channels.append(newchannel)

    canalmensajes[newchannel] = deque()

    return redirect("/" + newchannel)


@app.route("/<canal>")
def canal(canal):
    session['canal'] = canal

    return render_template('channel.html', channels=channels, canal=canal, mensajes=canalmensajes[canal])


@socketio.on("submit mensaje")
def msg(data):
    canal = session.get('canal')
    mensaje = data["mensaje"]
    tiempo = asctime(localtime())

    canalmensajes[canal].append([session.get('username'), mensaje, tiempo])

    emit("announce mensaje", {
        "user": session.get("username"),
        "mensaje": mensaje,
        "tiempo": tiempo},
        broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True)
