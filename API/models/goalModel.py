from models.lib import *

class Goal(reminder):
    def __init__(self, userId):
        reminder.__init__(self, "goal", userId)

    def load(self):
        msg, status = reminder.load(self)

        if status != 200:
            return msg, status
        
        for x in self.data:
            x["deadline"] = list()

            repeated = x["repeated"]
            units_of_time = x["unitsOfTime"]

            if repeated:
                if units_of_time == "days":
                    for i in range(0, 365 * self.show + 1, repeated):
                        _timeStarted = x["timeStarted"] + relativedelta(days=+i)
                        x["deadline"].append(_timeStarted)

                elif units_of_time == "weeks":
                    for i in range(0, 53 * self.show + 1, repeated):
                        _timeStarted = x["timeStarted"] + relativedelta(weeks=+i)
                        x["deadline"].append(_timeStarted)

                elif units_of_time == "months":
                    for i in range(1, 12 * self.show + 1, repeated):
                        _timeStarted = x["timeStarted"] + relativedelta(months=+i)
                        x["deadline"].append(_timeStarted)

                elif units_of_time == "years":
                    for i in range(1, self.show + 1, repeated):
                        _timeStarted = x["timeStarted"] + relativedelta(years=+i)
                        x["deadline"].append(_timeStarted)

                else:
                    pass
            
            for j in range(0, len(x["deadline"])-1):
                if not x["lastDone"]:
                    x["done"] = 0
                    break
                if x["deadline"][j] <= datetime.now().date() < x["deadline"][j+1] and x["deadline"][j] <= x["lastDone"] < x["deadline"][j+1]:
                    x["done"] = 1
                    break
            else:
                x["done"] = 0
        return msg, status

    def create_goal(self, goalName: str, timeStarted: str, unitsOfTime: str, repeated: int, color:str="#ffffff"):
        try:
            timeStarted = datetime.strptime(timeStarted, '%Y-%m-%d')
        except Exception as e:
            return str(e), 400
        if not all((goalName, timeStarted, unitsOfTime, repeated)):
            return 'Please fill out the form !', 400
        elif not str(repeated).isdigit():
            return 'Invalid repeated !', 400
        elif unitsOfTime not in ('days', 'months', 'weeks', 'years'):
            return 'Invalid unitsOfTime !', 400
        else:
            sql = "INSERT INTO goal (goalName ,timeStarted ,unitsOfTime ,repeated ,userId ,color) VALUES ( '% s', '% s', '% s', '% s', '% s', '% s')" % (goalName, timeStarted, unitsOfTime, repeated, self.userId ,color)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully create an goal !', 200
            except Exception as e:
                return str(e), 400
            
    def update_goal(self, goalId: int, goalName: str = None, timeStarted: str = None, unitsOfTime: str = None, repeated: int = None, color:str = None):
        for goal in self.data:
            if str(goal["goalId"]) == str(goalId):
                old_goal = goal
                break
        else:
            return "goal with id = %s is unknow !" % (goalId) , 400
        
        goalName = check_update(goalName, old_goal["goalName"])
        timeStarted = check_update(timeStarted, old_goal["timeStarted"].strftime('%Y-%m-%d'))
        unitsOfTime = check_update(unitsOfTime, old_goal["unitsOfTime"])
        repeated = check_update(repeated, old_goal["repeated"])
        color = check_update(color, old_goal["color"])

        try:
            timeStarted = datetime.strptime(timeStarted, '%Y-%m-%d')
        except Exception as e:
            return str(e), 400
        if not str(repeated).isdigit():
            return 'Invalid repeated !', 400
        elif unitsOfTime not in ('days', 'months', 'weeks', 'years'):
            return 'Invalid unitsOfTime !', 400
        else:
            sql = "UPDATE goal SET goalName='% s', timeStarted='% s', unitsOfTime='% s', repeated='% s', color='% s' WHERE userId = '% s' AND goalId = '%s'" % (goalName ,timeStarted ,unitsOfTime ,repeated ,color ,self.userId, goalId)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully update your goal !', 200
            except Exception as e:
                return str(e), 400