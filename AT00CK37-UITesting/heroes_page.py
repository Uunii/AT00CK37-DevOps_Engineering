
from selenium.webdriver.common.by import By  # Provides methods for locating elements on a webpage
from selenium.webdriver.support.ui import WebDriverWait  # Waits until a specified condition is met


class HeroesPage:
    URL = "https://www.dota2.com/heroes"  # URL of the Dota 2 heroes page

    SEARCH = (By.CSS_SELECTOR, 'input[type="text"]')     # Locator for the search input field
    CARDS = (By.CSS_SELECTOR, 'a[href*="/hero/"]')     # Locator for links that lead to individual hero pages

    def __init__(self, driver):
        self.driver = driver  # Stores the Selenium WebDriver instance
        self.wait = WebDriverWait(driver, 30)  # Allows up to 30 seconds for elements or conditions to load

    def open(self):
        self.driver.get(self.URL)  # Opens the Dota 2 heroes page
        # Waits until more than 50 hero cards are found, indicating that the page has loaded
        self.wait.until(lambda d: len(d.find_elements(*self.CARDS)) > 50)
        return self  # Returns this object so methods can be chained

    def _visible_cards(self):
        # Finds all hero cards and returns only those currently visible on the page
        return [
            c for c in self.driver.find_elements(*self.CARDS)
            if c.is_displayed()
        ]

    def visible_heroes(self):
        """Returns the URL slugs of currently visible heroes, e.g. ['pudge']."""
        # Gets each visible hero card's URL and extracts the part after '/hero/'
        return [
            c.get_attribute("href").split("/hero/")[-1]
            for c in self._visible_cards()
        ]

    def visible_attributes(self):
        """Returns the attributes of all visible hero cards, e.g. {'agility'}."""
        names = set()  # Creates a set to store unique hero attributes
        for card in self._visible_cards():
            # Finds the image inside the hero card and gets its image URL
            src = card.find_element(
                By.CSS_SELECTOR, "img"
            ).get_attribute("src")

            # Extracts the attribute name from the image filename
            # For example, 'hero_agi.png' becomes 'agi'
            names.add(
                src.rsplit("hero_", 1)[-1].replace(".png", "")
            )
        return names  # Returns the set of collected attributes

    def search(self, text):
        # Finds the search box on the page
        box = self.driver.find_element(*self.SEARCH)
        box.clear()  # Removes any existing search text
        box.send_keys(text)  # Types the new search text into the search box
        return self  # Returns this object so methods can be chained

    def filter_by(self, short):
        """Filters heroes by attribute: 'str', 'agi', 'int', or 'uni'."""
        # Finds and clicks the attribute filter using its CSS style
        # 'short' determines which filter to select
        self.driver.find_element(
            By.CSS_SELECTOR,
            f'div[style*="filter-{short}-active.png"]'
        ).click()
        return self  # Returns this object so methods can be chained

    def open_hero(self, slug):
        """Opens the visible hero card matching the given URL slug."""
        # Loops through all currently visible hero cards
        for card in self._visible_cards():
            # Checks whether the card's URL ends with the requested hero slug
            if card.get_attribute("href").rstrip("/").endswith(
                f"/hero/{slug}"
            ):
                card.click()  # Clicks the matching hero card
                return self  # Returns this object after clicking
        # Raises an error if no visible hero card matches the requested slug
        raise AssertionError(f"No visible card for hero '{slug}'")

    def screenshot(self, name):
        # Saves a screenshot of the current browser window as a PNG file
        self.driver.save_screenshot(f"{name}.png")