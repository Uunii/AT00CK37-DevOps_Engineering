import pytest
from heroes_page import HeroesPage


@pytest.mark.parametrize("query, expected", [
    ("pudge", "pudge"),
])
def test_search_finds_hero(driver, query, expected):
    page = HeroesPage(driver).open()
    all_count = len(page.visible_heroes())

    page.search(query)
    page.wait.until(lambda d: len(page.visible_heroes()) < all_count)

    assert expected in page.visible_heroes()
    page.screenshot(f"02_search_{query}")