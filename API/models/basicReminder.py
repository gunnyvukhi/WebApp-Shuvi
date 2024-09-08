from models.lib import *

class reminder:
    
    def __init__(self, table, userId):
        self.userId = userId
        self.cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        self.data = dict()
        self.table = table
        self.show = 5

    def load(self):
        sql = "SELECT * FROM %s WHERE userId='%s'" % (self.table, self.userId)
        self.cursor.execute(sql)
        try:
            temp_table = self.cursor.fetchall()
            if temp_table:
                self.data = temp_table
                return f"success loading {self.table}", 200
            else:
                return f"Fail load {self.table}", 404
        except Exception as e:
            return str(e), 404
    
    def delete(self, id: int, name: str):
        sql = f"DELETE FROM {self.table} WHERE {self.table}Id='{id}' AND {self.table}Name='{name}' AND userId='{self.userId}'"
        try:
            self.cursor.execute(sql)
            mysql.connection.commit()
            return f"Success Delete from {self.table}", 200
        except Exception as e:
            return str(e), 400
