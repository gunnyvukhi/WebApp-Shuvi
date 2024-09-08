from flask import Flask, session
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_session import Session

app = Flask(__name__)
app.debug = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

CORS(app)
Session(app)

app.secret_key = 'your secret key'

 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'todo-list'
mysql = MySQL(app)
 


