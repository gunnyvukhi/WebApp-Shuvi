from models.lib import *

class user:
    def __init__(self, email="", password=""):
        self.email = email.lower()
        self.password = password
        self.cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        self.user_info = dict()

    def load(self):
        try:
            self.cursor.execute('SELECT * FROM userbasic WHERE email = %s AND password = %s', (self.email, self.password))
            self.user_info = self.cursor.fetchone()
            if self.user_info:
                self.signed = True
                self.id = self.user_info["userId"]
                self.name = str(self.user_info["firstName"] + " " + self.user_info["lastName"]).capitalize()
            else:
                self.signed = False
        except Exception as e:
            self.signed = False
    
    def update(self, email=None, firstName=None, lastName=None, password=None, mobile=None, regionId=None, gender=None, birth=None, height=None, weight=None, avatar=None, permission=None):
        self.load()
        if self.signed:
            data = self.user_info.copy()
        else:
            return "unknow user", 404

        email = check_update(email, data['email'])
        if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            return 'Invalid email address !', 400

        firstName = check_update(firstName, data['firstName']).lower()
        lastName = check_update(lastName, data['lastName']).lower()

        password = check_update(password, data['password'])
        if len(password) < 6:
            return 'Password must be at least 6 characters', 400

        mobile = check_update(mobile, data['mobile'])
        if not re.match(r'[0-9]+', mobile):
            return 'Mobile must contain only numbers !', 400

        regionId = check_update(regionId, data['regionId'])
        if not str(regionId).isdigit():
            return 'Invalid region !', 400

        gender = str(check_update(gender, data['gender']))
        if not re.match(r'[0-4]+', gender):
            return 'Invalid gender !', 400
        

        try:
            birth = check_update(birth, data['birth'].strftime('%Y-%m-%d'))
            birth = datetime.strptime(birth, '%Y-%m-%d').date()
            if birth > date.today():
                return 'Are you from the future ?', 400
        except Exception as e:
            return 'Invalid birthday !', 400
        
        height = check_update(height, data['height'])
        if not str(height).isdigit():
            return 'Invalid height !', 400

        weight = check_update(weight, data['weight'])
        if not str(weight).isdigit():
            return 'Invalid weight !', 400

        avatar = check_update(avatar, data['avatar'])

        permission = check_update(permission, data['permission'])
        if not str(permission).isdigit():
            return 'Invalid permission !', 400

        sql = "UPDATE userBasic SET email='% s', firstName='% s', lastName='% s', password='% s', mobile='% s', regionId='% s', gender='% s', birth='% s', height='% s', weight='% s', avatar='% s', permission='% s' WHERE userId = '% s'" % (email, firstName, lastName, password, mobile, regionId, gender, birth, height, weight, avatar, permission, self.id)
        try:
            self.cursor.execute(sql)
            mysql.connection.commit()
            self.email = email
            self.password = password
            self.load()
            return "Update user info Susccess", 200
        except Exception as e:
            return "Update failed", 400

    def register(self, email: str, password:str, name: str, mobile: str, regionId: int, birth: str, gender: int):

        self.cursor.execute('SELECT * FROM userbasic WHERE email = % s', (email, ))
        account = self.cursor.fetchone()

        try:
            birth = datetime.strptime(birth, '%Y-%m-%d').date()
        except Exception as e:
            return 'Invalid birthday !', 400

        if account:
            return 'Account already exists !', 400
        elif not all((name, mobile, regionId, birth, gender)):
            return 'Please fill out the form !', 400
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            return 'Invalid email address !', 400
        elif not re.match(r'[0-9]+', mobile):
            return 'Mobile must contain only numbers !', 400
        elif len(password) < 6:
            return 'Password must be at least 6 characters', 400
        elif not str(regionId).isdigit():
            return 'Invalid region !', 400
        elif birth > date.today():
                return 'Are you from the future ?'
        elif not re.match(r'[0-4]+', str(gender)):
            return 'Invalid gender !', 400
        else:
            name = name.lower().split(' ')
            if len(name) == 1:
                lastName = name[0]
            else:
                firstName = " ".join(name[:-1])
                lastName = name[-1]
            sql = "INSERT INTO userbasic (email ,firstName ,lastName ,password ,mobile ,regionId, gender, birth) VALUES ( '% s', '% s', '% s', '% s', '% s', '% s', '% s', '% s')" % (email, firstName, lastName, password, mobile ,regionId, gender, birth)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.email = email
                self.password = password
                self.load()
                return 'You have successfully registered !', 200
            except Exception as e:
                return "Sigh up Failed", 400





    
