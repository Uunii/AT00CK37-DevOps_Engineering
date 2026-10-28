from heroes_page import HeroesPage


def test_agility_filter_and_toggle_off(driver):
    page = HeroesPage(driver).open()
    all_count = len(page.visible_heroes())

    # Filter on: only agility heroes remain
    page.filter_by("agi")
    page.wait.until(lambda d: len(page.visible_heroes()) < all_count)
    assert page.visible_attributes() == {"agility"}
    page.screenshot("03_filter_agility_on")

    # Filter off: the full hero list comes back
    page.filter_by("agi")
    page.wait.until(lambda d: len(page.visible_heroes()) == all_count)
    page.screenshot("03_filter_agility_off")