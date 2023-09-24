from typing import Iterable
from scrapy import Selector
from scrapy.http import Request

from scraper.spiders.la_centrale.la_centrale_spider import LaCentraleSpider


class LaCentraleMazdaMx5Spider(LaCentraleSpider):
    name = "la_centrale_mazda_mx5"

    def start_requests(self) -> Iterable[Request]:
        return super().start_requests(self.parse, "MAZDA", "MX5", "2005")

    def parse(self, response: Selector):
        stats = super().get_stats(response)
        return stats
