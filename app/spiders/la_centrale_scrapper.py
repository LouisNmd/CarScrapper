from functools import reduce
from typing import Iterable, List
from scrapy import Selector, Spider
from scrapy.http import Request

from app.helpers.dom_parser import parse_style


class LaCentraleScrapper(Spider):
    name = "la_centrale"

    threadshold_2k = 15

    def start_requests(self) -> Iterable[Request]:
        url = "https://www.lacentrale.fr/listing?categories=46%2C45&makesModelsCommercialNames=BMW%3AZ3&yearMax=2000"
        yield Request(url=url, callback=self.parse)

    def parse(self, response: Selector):
        chartBars = response.xpath(
            "//div[@class='minMaxChart__chartBars active']/*"
        ).getall()
        data = []
        for bar in chartBars:
            data.append(parse_style(html=bar, elements=["height"]))
        data_as_list = sum(data, [])
        percentage_max_size = reduce(lambda x, y: float(x) + float(y), data_as_list, 0)
        _price_percentage_list = list(
            map(lambda x: (float(x) * 100) / percentage_max_size, data_as_list)
        )
        _average_price = 0
        for index, price_percentage in enumerate(_price_percentage_list):
            if index > self.threadshold_2k:
                _average_price += (
                    2000 * self.threadshold_2k + 5000 * (self.threadshold_2k - index)
                ) * price_percentage
            else:
                _average_price += (2000 * index) * price_percentage
        _average_price /= 100
        print(data_as_list)
