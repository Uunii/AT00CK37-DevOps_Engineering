import pytest #the test framework (provides @parametrize, asserts, etc.)
from selenium import webdriver #Selenium WebDriver for controlling the browser
from selenium.webdriver.chrome.options import Options #Chrome-specific options for customizing browser behavior

@pytest.fixture
def driver():
    """`
    Pytest fixture that creates a Chrome WebDriver instance configured for
    mobile emulation, yields it to the test, then quits the browser afterward.

    Fixtures are functions that run before a test (setup) and can clean up
    afterward (teardown). The `yield` keyword separates setup from teardown:
    code before `yield` runs before the test, code after `yield` runs after.
    """

    # Create Chrome options object to customize browser launch behavior
    options = Options()

    # Enable mobile device emulation so the site renders as on a phone. as the first task was done.
    options.add_experimental_option("mobileEmulation", {
        "deviceMetrics": {"width": 412, "height": 924, "pixelRatio": 2.625},
        "userAgent": (
            "Mozilla/5.0 (Linux; Android 14; Pixel 10) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        ),
    })

    # Launch Chrome with the configured options
    drv = webdriver.Chrome(options=options)

    # Yield the driver to the test function. The test runs while the fixture is paused at this `yield` statement.
    yield drv

    # Teardown: close the browser and end the WebDriver session after the test
    drv.quit()