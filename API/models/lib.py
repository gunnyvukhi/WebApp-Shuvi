import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import MySQLdb.cursors
import re
from config import mysql
from datetime import datetime, date, timedelta
from dateutil.relativedelta import relativedelta

from models.basicReminder import reminder

def check_update(a=None, b=None):
    if a:
        return a
    else:
        return b
    
def check_week_number(day: datetime):
    num = 0
    month = day.month

    while month == day.month:
        day =  day - relativedelta(weeks=+1)
        num += 1

    return num

def check_week_date(year: int, month: int, week: int, weekday: int, days: int, time_start: datetime = None, time_end: datetime = None):
    day = datetime(year=year, month=month, day=1)
    while day.weekday() != weekday:
        day = day.replace(day=day.day + 1)

    week -= 1
    first_day = date(year, month, 1)
    next_month = date(year + (month // 12), month % 12 + 1, 1)
    num_days = (next_month - first_day).days

    if (day.day + week*7 + days) > num_days:
        week -= 1
    day = day.replace(day=day.day + week*7)
    ended = day.replace(day=day.day + days)
    if time_start:
        day = ended.replace(hour=time_start.hour, minute=time_start.minute, second=time_start.second, microsecond=time_start.microsecond)
    if time_end:
        ended = ended.replace(hour=time_end.hour, minute=time_end.minute, second=time_end.second, microsecond=time_end.microsecond)
    return day, ended