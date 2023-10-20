from datetime import date
from functools import reduce
import functools
from typing import Iterable
from scrapy import Selector, Spider
from scrapy.http import Request

from scraper.app.helpers.dom_parser import parse_style


class LaCentraleSpider(Spider):
    custom_settings = {
        "ITEM_PIPELINES": {
            "scraper.app.pipelines.la_centrale_pipeline.LaCentralePipeline": 0
        },
    }

    prices_list = []
    current_page = 1

    def start_requests(self, brand: str, model: str, maxYear: str) -> Iterable[Request]:
        while self.current_page < 10:
            url = f"https://www.lacentrale.fr/listing?categories=46%2C45&makesModelsCommercialNames={brand}%3A{model}&options=&page={self.current_page}&yearMax={maxYear}"
            self.current_page += 1
            yield Request(url=url, callback=self.parse)

    def parse(self, response: Selector):
        html_prices = response.xpath(
            '//span[@class="Text_Text_text Vehiculecard_Vehiculecard_price Text_Text_subtitle2"]/text()'
        ).getall()
        if len(html_prices) == 0:
            return
        prices = [x.replace(" ", "") for x in html_prices if x != " €"]
        self.prices_list += prices
        average_price = functools.reduce(lambda x, y: int(x) + int(y), prices) / len(
            prices
        )
        return {"average_price": average_price, "prices_list": self.prices_list}
