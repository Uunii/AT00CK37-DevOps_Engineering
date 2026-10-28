import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


@pytest.fixture
def driver():
    options = Options()
    options.add_experimental_option("mobileEmulation", {
        "deviceMetrics": {"width": 412, "height": 924, "pixelRatio": 2.625},
        "userAgent": (
            "Mozilla/5.0 (Linux; Android 14; Pixel 10) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        ),
    })
    # Brave only: uncomment and fix the path if needed
    # options.binary_location = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

    drv = webdriver.Chrome(options=options)
    yield drv
    drv.quit()