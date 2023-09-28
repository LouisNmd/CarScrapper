from datetime import date
from functools import reduce
from typing import Iterable
from scrapy import Selector, Spider
from scrapy.http import Request

from app.helpers.dom_parser import parse_style


class LaCentraleSpider(Spider):
    threadshold_2k = 15

    custom_settings = {
        "FEEDS": {"data/%(name)s/%(name)s_%(time)s.json": {"format": "json"}}
    }

    def start_requests(
        self, parse, brand: str, model: str, maxYear: str
    ) -> Iterable[Request]:
        url = "https://www.lacentrale.fr/listing?categories=46%2C45&makesModelsCommercialNames={0}%3A{1}&yearMax={2}".format(
            brand, model, maxYear
        )
        yield Request(url=url, callback=parse)

    def get_stats(self, response: Selector):
        chartBars = response.xpath(
            "//div[@class='minMaxChart__chartBars active']/*"
        ).getall()
        data = []
        for bar in chartBars:
            data.append(parse_style(html=bar, elements=["height"])[0]["height"])
        percentage_max_size = reduce(lambda x, y: float(x) + float(y), data, 0)
        price_percentage_list = list(
            map(lambda x: (float(x) * 100) / percentage_max_size, data)
        )
        _average_price = 0
        _median = 0
        median_index = 0
        for index, price_percentage in enumerate(price_percentage_list):
            _average_price += self.get_price_per_index(index) * price_percentage

            if _median < 50:
                _median += price_percentage
                median_index = index
        _average_price /= 100
        _median = self.get_price_per_index(median_index)
        stats = {}
        stats["average_price"] = round(_average_price, 2)
        stats["median"] = _median
        stats["time"] = date.today()
        return stats

    def get_price_per_index(self, index: int):
        if index > self.threadshold_2k:
            return 2000 * self.threadshold_2k + 5000 * (index - self.threadshold_2k)
        else:
            return 2000 * index
