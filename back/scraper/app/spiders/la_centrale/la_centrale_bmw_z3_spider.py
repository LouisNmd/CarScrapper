from typing import Iterable
from scrapy.http import Request

from scraper.app.spiders.la_centrale.la_centrale_spider import LaCentraleSpider


class LaCentraleBmwZ3Spider(LaCentraleSpider):
    name = "la_centrale_bmw_z3"

    def start_requests(self) -> Iterable[Request]:
        return super().start_requests("BMW", "Z3", "2000")
