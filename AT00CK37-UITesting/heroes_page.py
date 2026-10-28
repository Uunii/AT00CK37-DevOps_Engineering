from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait


class HeroesPage:
    URL = "https://www.dota2.com/heroes"
    SEARCH = (By.CSS_SELECTOR, 'input[type="text"]')
    CARDS = (By.CSS_SELECTOR, 'a[href*="/hero/"]')

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 30)

    def open(self):
        self.driver.get(self.URL)
        self.wait.until(lambda d: len(d.find_elements(*self.CARDS)) > 50)
        return self

    def _visible_cards(self):
        return [c for c in self.driver.find_elements(*self.CARDS) if c.is_displayed()]

    def visible_heroes(self):
        """Slugs (e.g. 'pudge') of the hero cards currently displayed."""
        return [c.get_attribute("href").split("/hero/")[-1] for c in self._visible_cards()]

    def visible_attributes(self):
        """Attribute of every displayed card, e.g. {'agility'}."""
        names = set()
        for card in self._visible_cards():
            src = card.find_element(By.CSS_SELECTOR, "img").get_attribute("src")
            names.add(src.rsplit("hero_", 1)[-1].replace(".png", ""))
        return names

    def search(self, text):
        box = self.driver.find_element(*self.SEARCH)
        box.clear()
        box.send_keys(text)
        return self

    def filter_by(self, short):
        """short = 'str' | 'agi' | 'int' | 'uni'"""
        self.driver.find_element(
            By.CSS_SELECTOR, f'div[style*="filter-{short}-active.png"]'
        ).click()
        return self
    
    def open_hero(self, slug):
            """Click the visible card whose link ends with /hero/<slug>."""
            for card in self._visible_cards():
                if card.get_attribute("href").rstrip("/").endswith(f"/hero/{slug}"):
                    card.click()
                    return self
            raise AssertionError(f"No visible card for hero '{slug}'")

    def screenshot(self, name):
        self.driver.save_screenshot(f"{name}.png")