import pytest #the test framework (provides @parametrize, asserts, etc.)
from heroes_page import HeroesPage #page-object that wraps browser interactions for the

@pytest.mark.parametrize("query, expected", [
    ("pudge", "pudge"),
])
def test_search_finds_hero(driver, query, expected):
    """
    Test that searching for a hero returns that hero in the results.
    Parameters:
        driver   – the Chrome WebDriver fixture (from conftest.py)
        query    – the text typed into the search box (supplied by @parametrize)
        expected – the hero name we expect to see after searching
    """

    # Instantiate the page object, passing the browser driver, then open the
    # heroes listing page (navigates to the URL and waits for it to load).
    page = HeroesPage(driver).open()

    # Record how many heroes are visible before searching, so we can later
    # confirm the list actually narrowed down after the search.
    all_count = len(page.visible_heroes())

    # Type the search query into the page's search field.
    page.search(query)

    # Wait (poll) until the number of visible heroes drops below the original
    page.wait.until(lambda d: len(page.visible_heroes()) < all_count)

    # Assertion: verify the expected hero name appears in the visible heroes.
    # If this fails, pytest reports the test as failed.
    assert expected in page.visible_heroes()

    # Save a screenshot of the page, named after the search query
    page.screenshot(f"02_search_{query}")