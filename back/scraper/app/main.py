import schedule
import time
import os

print("Scheduler initialised")
schedule.every(30).seconds.do(lambda: os.system("scrapy crawl la_centrale_mazda_mx5"))
schedule.every(30).seconds.do(lambda: os.system("scrapy crawl la_centrale_bmw_z3"))
print("Next job is set to run at: " + str(schedule.next_run()))

while True:
    schedule.run_pending()
    time.sleep(1)
