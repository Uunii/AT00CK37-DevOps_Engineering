from selenium.webdriver.common.by import By
from heroes_page import HeroesPage


def test_search_then_open_invoker_page(driver):
    page = HeroesPage(driver).open()
    all_count = len(page.visible_heroes())

    # Search for Invoker and wait for the grid to narrow down
    page.search("invoker")
    page.wait.until(lambda d: len(page.visible_heroes()) < all_count)
    assert "invoker" in page.visible_heroes()

    # Click the card and wait for the hero's own page
    page.open_hero("invoker")
    page.wait.until(
        lambda d: d.current_url.rstrip("/") == "https://www.dota2.com/hero/invoker"
    )

    # Wait for real content: page fully loaded and hero name rendered as text
    page.wait.until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )
    page.wait.until(
        lambda d: "invoker" in d.find_element(By.TAG_NAME, "body").text.lower()
    )

    # Wait until every <img> on the page has finished loading
    page.wait.until(lambda d: d.execute_script(
        "return [...document.images].every(i => i.complete)"
    ))

    # Short settle time for the page's fade-in animation, so the screenshot isn't blank
    import time
    time.sleep(2)

    page.screenshot("05_invoker_hero_page")