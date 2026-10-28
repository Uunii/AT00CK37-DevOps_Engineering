from heroes_page import HeroesPage #page-object that wraps browser interactions for the
#                heroes listing page

def test_agility_filter_and_toggle_off(driver):
    """
    Test that filtering by agility shows only agility heroes, and toggling
    the same filter off restores the full hero list.

    Parameters:
        driver – the Chrome WebDriver fixture (from conftest.py)
    """

    # Open the heroes listing page via the page object.
    page = HeroesPage(driver).open()

    # Count visible heroes before filtering so we can compare before/after.
    all_count = len(page.visible_heroes())

    # Apply the "agi" (agility) filter; only agility heroes should remain.
    page.filter_by("agi")

    # Wait until the hero grid shrinks (fewer heroes than before filtering).
    page.wait.until(lambda d: len(page.visible_heroes()) < all_count)

    # Assert that the only attribute tag now shown is "agility".
    assert page.visible_attributes() == {"agility"}

    # Screenshot with the filter on, for visual verification / debugging.
    page.screenshot("03_filter_agility_on")

    # Clicking the same filter again toggles it off, restoring all heroes.
    page.filter_by("agi")

    # Wait until the hero count returns to the original full count.
    page.wait.until(lambda d: len(page.visible_heroes()) == all_count)

    # Screenshot with the filter off, confirming the full list is back.
    page.screenshot("03_filter_agility_off")