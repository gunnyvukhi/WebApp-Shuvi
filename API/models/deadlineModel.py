from models.lib import *

class Deadline(reminder):
    def __init__(self, userId):
        reminder.__init__(self, "deadline", userId)

    def load(self):
        msg, status = reminder.load(self)

        if status != 200:
            return msg, status
        
        for x in self.data:

            x["Process"] = ""

            if x["timeEnd"] >= datetime.now():
                if str(x["status"]) == '0':
                    x["Process"] = "Incomplete"
                else:
                    x["Process"] = "Completed"
            else:
                if str(x["status"]) == '0':
                    x["Process"] = "Late"
                else:
                    x["Process"] = "Deleted"
                    self.delete(x["deadlineId"], x["deadlineName"])
        return msg, status

    def create_deadline(self, deadline_name: str, end_time: str, color:str="#ffffff"):
        try:
            timeEnd = datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')
            if datetime.now() > timeEnd:
                return "Invalid date", 400
        except Exception as e:
            return str(e), 400
        if not all((deadline_name, end_time)):
            return 'Please fill out the form !', 400
        else:
            sql = "INSERT INTO deadline (deadlineName ,timeEnd, userId ,color) VALUES ( '% s', '% s', '% s', '% s')" % (deadline_name, timeEnd, self.userId ,color)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully create an deadline !', 200
            except Exception as e:
                return str(e), 400
            
    def update_deadline(self, deadlineId: int, deadlineName: str = None, timeEnd:str = None,status:int = 0 , color:str = None):
        for deadline in self.data:
            if str(deadline["deadlineId"]) == str(deadlineId):
                old_deadline = deadline
                break
        else:
            return "deadline with id = %s is unknow !" % (deadlineId) , 400
        
        if timeEnd:
            try:
                timeEnd = datetime.strptime(timeEnd, '%Y-%m-%d %H:%M:%S')
                if datetime.now() > timeEnd:
                    return "Invalid date", 400
            except Exception as e:
                return str(e), 400

        deadlineName = check_update(deadlineName, old_deadline["deadlineName"])
        timeEnd = check_update(timeEnd, old_deadline["timeEnd"].strftime('%Y-%m-%d %H:%M:%S'))
        status = check_update(status, old_deadline["status"])
        color = check_update(color, old_deadline["color"])

        if not any((deadlineName, timeEnd, color, status)):
            return 'Please fill out the form !', 400
        if not str(status).isdigit():
            return 'Invalid status !', 400
        else:
            sql = "UPDATE deadline SET deadlineName='% s', timeEnd='% s', status='% s', color='% s' WHERE userId = '% s' AND deadlineId = '%s'" % (deadlineName ,timeEnd ,status ,color ,self.userId, deadlineId)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully update your deadline !', 200
            except Exception as e:
                return str(e), 400