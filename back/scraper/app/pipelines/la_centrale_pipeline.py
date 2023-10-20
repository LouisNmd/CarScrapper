from itemadapter import ItemAdapter
from datetime import datetime
import json


class LaCentralePipeline(object):
    prices_sum = 0
    page_scrapped = 0
    prices_list = []

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        average_price = adapter.get("average_price")
        if average_price:
            self.prices_sum += average_price
            self.page_scrapped += 1

        price_list = adapter.get("prices_list")
        if price_list:
            self.prices_list += price_list

    def close_spider(self, spider):
        value = {
            "average_price": self.prices_sum / self.page_scrapped,
            "median": self.prices_list[int(len(self.prices_list) / 2)],
            "time": str(self.get_current_date()),
        }
        with open(
            f"data/{spider.name}/{spider.name}_{self.get_current_date_time()}.json",
            "w",
        ) as f:
            json.dump(value, f)

    def get_current_date_time(self):
        return datetime.now().strftime("%Y-%m-%dT%H-%M-%S+00-00")

    def get_current_date(self):
        return datetime.now().strftime("%Y-%m-%d")
