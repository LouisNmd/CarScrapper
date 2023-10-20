from typing import Iterable
from scrapy.http import Request

from app.spiders.la_centrale.la_centrale_spider import LaCentraleSpider


class LaCentraleMazdaMx5Spider(LaCentraleSpider):
    name = "la_centrale_mazda_mx5"

    def start_requests(self) -> Iterable[Request]:
        return super().start_requests("MAZDA", "MX5", "2005")
