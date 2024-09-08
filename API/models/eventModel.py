from models.lib import *

class Event(reminder):
    def __init__(self, userId):
        reminder.__init__(self, "event", userId)

    def load(self):
        msg, status = reminder.load(self)

        if status != 200:
            return msg, status
        
        for x in self.data:
            x["onDay"] = list()

            x["onDay"].append((x["dayStarted"], x["dayEnd"]))

            repeated = x["repeated"]
            if repeated:

                if repeated % 2 == 0: #Nếu lặp lại theo ngày trong tuần thì reapeated = 2, 4, 6, 8
                    week_day_start = x["dayStarted"].weekday()
                    week_num_start = check_week_number(x["dayStarted"])
                    day_last = x["dayEnd"].day - x["dayStarted"].day
                    if repeated == 2: #lặp lại vào tuần thứ n của mỗi tháng là 2
                        for _year in range(self.show):
                            year = x["dayStarted"].year + _year
                            for month in range(1, 13):
                                if month <= x["dayStarted"].month and _year == 0:
                                    continue
                                _day = check_week_date(year=year, month=month, week=week_num_start, weekday=week_day_start, days=day_last)
                                x["onDay"].append(_day)
                    elif repeated == 4: #lặp lại vào tuần thứ n của tháng tháng m mỗi năm là 4
                        for _year in range(1, self.show + 1):
                            year = x["dayStarted"].year + _year
                            _day = check_week_date(year=year, month=x["dayStarted"].month, week=week_num_start, weekday=week_day_start, days=day_last)
                            x["onDay"].append(_day)
                else:
                    if repeated == 1: #lặp lại mỗi tuần là 1
                        for i in range(1, 53 * self.show + 1):
                            _dayStarted = x["dayStarted"] + relativedelta(weeks=+i)
                            _dayEnd = x["dayEnd"] + relativedelta(weeks=+i)
                            x["onDay"].append((_dayStarted, _dayEnd))

                    elif repeated == 3: #lặp lại mỗi tháng là 3
                        for i in range(1, 12 * self.show + 1):
                            _dayStarted = x["dayStarted"] + relativedelta(months=+i)
                            _dayEnd = x["dayEnd"] + relativedelta(months=+i)
                            x["onDay"].append((_dayStarted, _dayEnd))

                    elif repeated == 5: #lặp lại mỗi năm là 5
                        for i in range(1, self.show + 1):
                            _dayStarted = x["dayStarted"] + relativedelta(years=+i)
                            _dayEnd = x["dayEnd"] + relativedelta(years=+i)
                            x["onDay"].append((_dayStarted, _dayEnd))
        return msg, status

    def create_event(self, event_name: str, start_date: str, end_date: str, repeated: int, color:str="#ffffff"):
        try:
            dayStarted = datetime.strptime(start_date, '%Y-%m-%d').date()
            dayEnd = datetime.strptime(end_date, '%Y-%m-%d').date()
            if dayStarted > dayEnd:
                return "Invalid date", 400
            num_days = int((dayEnd - dayStarted).days)
        except Exception as e:
            return str(e), 400
        if not all((event_name, start_date, end_date, repeated)):
            return 'Please fill out the form !', 400
        elif not re.match(r'[0-6]+', str(repeated)):
            return 'Invalid repeated mode !', 400
        elif repeated == 1 and num_days > 6:
            return 'Invalid repeated week and date !', 400
        elif 1 < repeated < 4 and num_days > 28:
            return 'Invalid repeated month and date !', 400
        elif 4 <= repeated and num_days > 365:
            return 'Invalid repeated year and date !', 400
        else:
            sql = "INSERT INTO event (eventName ,dayStarted ,dayEnd ,repeated ,userId ,color) VALUES ( '% s', '% s', '% s', '% s', '% s', '% s')" % (event_name, dayStarted, dayEnd, repeated, self.userId ,color)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully create an event !', 200
            except Exception as e:
                return str(e), 400
            
    def update_event(self, eventId: int, eventName: str = None, dayStarted: str = None, dayEnd: str = None, repeated: int = None, color:str = None):
        for event in self.data:
            if str(event["eventId"]) == str(eventId):
                old_event = event
                break
        else:
            return "Event with id = %s is unknow !" % (eventId) , 400
        
        eventName = check_update(eventName, old_event["eventName"])
        dayStarted = check_update(dayStarted, old_event["dayStarted"].strftime('%Y-%m-%d'))
        dayEnd = check_update(dayEnd, old_event["dayEnd"].strftime('%Y-%m-%d'))
        repeated = check_update(repeated, old_event["repeated"])
        color = check_update(color, old_event["color"])

        try:
            dayStarted = datetime.strptime(dayStarted, '%Y-%m-%d').date()
            dayEnd = datetime.strptime(dayEnd, '%Y-%m-%d').date()
            if dayStarted > dayEnd:
                return "Invalid date", 400
            num_days = int((dayEnd - dayStarted).days)
        except Exception as e:
            return str(e), 400
        if not re.match(r'[0-6]+', str(repeated)):
            return 'Invalid repeated mode !', 400
        elif repeated == 1 and num_days > 6:
            return 'Invalid repeated week and date !', 400
        elif 1 < repeated < 4 and num_days > 28:
            return 'Invalid repeated month and date !', 400
        elif 4 <= repeated and num_days > 365:
            return 'Invalid repeated year and date !', 400
        else:
            sql = "UPDATE event SET eventName='% s', dayStarted='% s', dayEnd='% s', repeated='% s', color='% s' WHERE userId = '% s' AND eventId = '%s'" % (eventName ,dayStarted ,dayEnd ,repeated ,color ,self.userId, eventId)

            try:
                self.cursor.execute(sql)
                mysql.connection.commit()
                self.load()
                return 'You have successfully update your event !', 200
            except Exception as e:
                return str(e), 400