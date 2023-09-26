from typing import Iterable
from scrapy import Selector
from scrapy.http import Request

from app.spiders.la_centrale.la_centrale_spider import LaCentraleSpider


class LaCentraleBmwZ3Spider(LaCentraleSpider):
    name = "la_centrale_bmw_z3"

    def start_requests(self) -> Iterable[Request]:
        return super().start_requests(self.parse, "BMW", "Z3", "2000")

    def parse(self, response: Selector):
        stats = super().get_stats(response)
        return stats
