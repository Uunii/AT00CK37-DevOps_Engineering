from selenium.webdriver.common.by import By #Selenium class used to locate elements by strategy
from heroes_page import HeroesPage #page-object that wraps browser interactions for the heroes listing page
import time

def test_search_then_open_invoker_page(driver):
    """
    Test flow: search for "Invoker", confirm it appears, open its hero page,
    and verify the page fully loads (URL, body text, and all images).

    Parameters:
        driver – the Chrome WebDriver fixture (from conftest.py)
    """

    # Open the heroes listing page via the page object.
    page = HeroesPage(driver).open()

    # Count visible heroes before searching, for comparison after filtering.
    all_count = len(page.visible_heroes())

    # Type "invoker" into the search field so the hero grid narrows down.
    page.search("invoker")

    # Wait until the visible hero count drops below the original count,
    page.wait.until(lambda d: len(page.visible_heroes()) < all_count)

    # Assertion: "invoker" should appear among the visible hero names.
    assert "invoker" in page.visible_heroes()

    # Click the Invoker hero card to navigate to its dedicated page.
    page.open_hero("invoker")

    # Wait until the browser URL matches the expected Invoker hero page URL
    page.wait.until(
        lambda d: d.current_url.rstrip("/") == "https://www.dota2.com/hero/invoker"
    )

    # Wait until the document reports "complete" readiness (DOM + resources).
    page.wait.until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )

    # confirming the hero name has actually rendered on the page.
    page.wait.until(
        lambda d: "invoker" in d.find_element(By.TAG_NAME, "body").text.lower()
    )

    # Wait until every <img> on the page has finished loading
    page.wait.until(lambda d: d.execute_script(
        "return [...document.images].every(i => i.complete)"
    ))
    time.sleep(2)

    page.screenshot("05_invoker_hero_page")