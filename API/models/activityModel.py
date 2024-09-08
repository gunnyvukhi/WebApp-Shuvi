from models.lib import *

class Activity(reminder):
    def __init__(self, userId):
        reminder.__init__(self, "activity", userId)

    def load(self):
        msg, status = reminder.load(self)

        if status != 200:
            return msg, status
        
        for x in self.data:
            x["onDay"] = list()

            x["onDay"].append((x["timeStarted"], x["timeEnd"]))

            repeated = x["repeated"]

            if repeated:

                if repeated % 2 == 0: #Nếu lặp lại theo ngày trong tuần thì reapeated = 2, 4, 6, 8
                    week_day_start = x["timeStarted"].weekday()
                    week_num_start = check_week_number(x["timeStarted"])
                    if repeated == 2: #lặp lại vào tuần thứ n của mỗi tháng là 2
                        for _year in range(self.show):
                            year = x["timeStarted"].year + _year
                            for month in range(1, 13):
                                if month <= x["timeStarted"].month and _year == 0:
                                    continue
                                _time = check_week_date(year=year, month=month, week=week_num_start, weekday=week_day_start, days=0, time_start=x["timeStarted"], time_end=x["timeEnd"])
                                x["onDay"].append(_time)
                    elif repeated == 4: #lặp lại vào tuần thứ n của tháng tháng m mỗi năm là 4
                        for _year in range(1, self.show + 1):
                            year = x["timeStarted"].year + _year
                            _time = check_week_date(year=year, month=x["timeStarted"].month, week=week_num_start, weekday=week_day_start, days=0, time_start=x["timeStarted"], time_end=x["timeEnd"])
                            x["onDay"].append(_time)
                else:
                    if repeated == 1: #lặp lại mỗi tuần là 1
                        for i in range(1, 53 * self.show + 1):
                            _timeStarted = x["timeStarted"] + relativedelta(weeks=+i)
                            _timeEnd = x["timeEnd"] + relativedelta(weeks=+i)
                            x["onDay"].append((_timeStarted, _timeEnd))

                    elif repeated == 3: #lặp lại mỗi tháng là 3
                        for i in range(1, 12 * self.show + 1):
                            _timeStarted = x["timeStarted"] + relativedelta(months=+i)
                            _timeEnd = x["timeEnd"] + relativedelta(months=+i)
                            x["onDay"].append((_timeStarted, _timeEnd))

                    elif repeated == 5: #lặp lại mỗi năm là 5
                        for i in range(1, self.show + 1):
                            _timeStarted = x["timeStarted"] + relativedelta(years=+i)
                            _timeEnd = x["timeEnd"] + relativedelta(years=+i)
                            x["onDay"].append((_timeStarted, _timeEnd))
        return msg, status

    def create_activity(self, activityName: str, timeStarted: str, timeEnd: str, repeated: int, color:str="#ffffff"):
        try:
            timeStarted = datetime.strptime(timeStarted, '%Y-%m-%d %H:%M:%S')
            timeEnd = datetime.strptime(timeEnd, '%Y-%m-%d %H:%M:%S')
            if timeStarted.day != timeEnd.day:
                return "Invalid date", 400
        except Exception as e:
            return str(e), 400
        if not all((activityName, timeStarted, timeEnd, repeated)):
            return 'Please fill out the form !', 400
        elif not re.match(r'[0-6]+', str(repeated)):
            return 'Invalid repeated mode !', 400
        else:
            sql = "INSERT INTO activity (activityName ,timeStarted ,timeEnd ,repeated ,userId ,color) VALUES ( '% s', '% s', '% s', '% s', '% s', '% s')" % (activityName, timeStarted, timeEnd, repeated, self.userId ,color)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully create an activity !', 200
            except Exception as e:
                return str(e), 400
            
    def update_activity(self, activityId: int, activityName: str = None, timeStarted: str = None, timeEnd: str = None, repeated: int = None, color:str = None):
        for activity in self.data:
            if str(activity["activityId"]) == str(activityId):
                old_activity = activity
                break
        else:
            return "Activity with id = %s is unknow !" % (activityId) , 400
        
        activityName = check_update(activityName, old_activity["activityName"])
        timeStarted = check_update(timeStarted, old_activity["timeStarted"].strftime('%Y-%m-%d %H:%M:%S'))
        timeEnd = check_update(timeEnd, old_activity["timeEnd"].strftime('%Y-%m-%d %H:%M:%S'))
        repeated = check_update(repeated, old_activity["repeated"])
        color = check_update(color, old_activity["color"])

        try:
            timeStarted = datetime.strptime(timeStarted, '%Y-%m-%d %H:%M:%S')
            timeEnd = datetime.strptime(timeEnd, '%Y-%m-%d %H:%M:%S')
            if timeStarted.day != timeEnd.day:
                return "Invalid date", 400
        except Exception as e:
            return str(e), 400
        if not re.match(r'[0-6]+', str(repeated)):
            return 'Invalid repeated mode !', 400
        else:
            sql = "UPDATE activity SET activityName='% s', timeStarted='% s', timeEnd='% s', repeated='% s', color='% s' WHERE userId = '% s' AND activityId = '%s'" % (activityName ,timeStarted ,timeEnd ,repeated ,color ,self.userId, activityId)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully update your activity !', 200
            except Exception as e:
                return str(e), 400