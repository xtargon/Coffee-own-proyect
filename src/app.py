from flask import Flask, redirect, request, session, jsonify, make_response
from flask import render_template
from flask_pymongo import PyMongo, ObjectId
import hashlib



app = Flask(__name__)
SESSION_TYPE  =  'redis'


app.config['MONGO_URI'] = 'mongodb://localhost/cafe'

mongo = PyMongo(app)
user_db = mongo.db.user
busines_db = mongo.db.bussines

class userArchitecture:
    def __init__(self, user):
        self.user = user['username']

        if 'mail' in user:
            self.email = user['mail']

        self.password = user['pass']
        self.E = False

        print(self.user)

    def Start(self):
# Aquí añadimos la funcion que manejara el registro de usuarios en la base de datos. Insert MongoDB.
        hashpass = hashlib.md5(self.password.encode('utf8')).hexdigest()
        id = user_db.insert({
            'username': self.user,
            'mail': self.email,
            'password': hashpass
        })

        print('el usuario se a registrado sastifactoriamente '+self.user)
        return id

    def Find(self):
        for doc in user_db.find({'username':self.user}):
            if doc:
                 self.E = True
            else:
                 pass

        if self.E == False:
            return 'Empty'
        else:
            return 'busy'

    def Login(self):
        hashpass = hashlib.md5(self.password.encode('utf8')).hexdigest()
        for doc in user_db.find({'username':self.user, 'password': hashpass}):
            if doc:
                 self.E = True
                 session['username'] = doc['username']
                 session['user_id'] = str(doc['_id'])

            else:
                 pass

        if self.E == False:
            return '0'
        else:
            user_in = {'user': session['username'], 'id': session['user_id']}
            return jsonify(user_in)

    def logout(self):
        if 'username' in session:
            self.E = False
            del session['username']
            del session['user_id']
        else:
            session['username'] = ''
            session['user_id'] =  ''
            self.E = False
        return '1' 


class bussines_u:
    def __init__(self, user):
        self.user = user
        self.bussines = ''
        self.exists = False

        print(self.user)
# Aquí buscamos y veryficamos que el usuario tenga registrado un negocio y devolbemos un dato según el resultado
    def Find_bussines(self):
        for b in busines_db.find({'user': self.user}):
            if b:
                self.bussines = b
                self.exists = True                

            else:
                pass
        if self.exists == False:
            return '0'
        else:
            return '1'

@app.route("/", methods=['GET'])
def index():

    return render_template('index.html')

@app.route("/home", methods=['GET'])
def home():
    if 'user_id' in session:
        userVist = {'user': session['username'], 'id': session['user_id']}
        return render_template('home.html', p = userVist)
    else:
        return 'Mejor inicia session, rufian >:('



# Aquí validamos si en nombre de usuario esta ocupado o disponible.
@app.route('/addUser', methods=['POST'])
def UserSave():
    user = request.json['user']
    mail = request.json['mail']
    password = request.json['pass']

    user_json = {'username': user, 'mail': mail, 'pass': password}
 # Dependiendo de su estado se insertara en la base de datos, utilizando la clase usuario.
    create = userArchitecture(user_json)
    busy = create.Find()
    if busy == 'Empty':
        start = create.Start()
        if start: 
            status = {'s':'1'}

            print(status)
            return jsonify(status)

    if busy != 'Empty':
        status = {'s':'0'}

        print(status)
        return jsonify(status)    


@app.route('/Login', methods=['POST'])
def UserLogin():
    user = request.json['user']
    password = request.json['pass']

    user_json = {'username': user, 'pass': password}
 # Dependiendo de su estado se Buscara en la base de datos, utilizando la clase usuario.
    user_login = userArchitecture(user_json)
    busy = user_login.Login()

    if busy != '0':
        status = {'s':'1'}
        return jsonify(status)
    else:
        status = {'s':'0'}
        return jsonify(status) 


@app.route('/exists', methods=['POST'])
def ExistsBussines():
    user = session['user_id']

    e = bussines_u(user)
    result = e.Find_bussines()
    print(e)
    back = {'d': result}
    return back

@app.route('/logout', methods=['POST'])
def logoutme():
    user_json = {'username': 'log', 'pass': 'out'}
    user_logout = userArchitecture(user_json)
    busy = user_logout.logout()
    back = {'d': '1'}
    return back

if __name__ == '__main__':
    app.secret_key = '*//56/7*//*y*/i*/´pp´+/78*/'
    app.run(debug=True)