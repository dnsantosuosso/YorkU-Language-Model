# York-Language-Model

This repository contains York University's public data for a Large Language Model development project under a research project for the PACS Lab, at Lassonde School of Engineering.

The data under this repository was scraped from York University's website (https://www.yorku.ca) using the following command:

`wget --recursive --level=inf --span-hosts --page-requisites --html-extension --convert-links --no-parent --domains yorku.ca --wait=2 --limit-rate=20k -e robots=off -c https://www.yorku.ca`

To clean the HTML data, `clea_html.py` was developed, which removes the markup language from HTML files.

This image must then be structured and passed to the ML model for training.
