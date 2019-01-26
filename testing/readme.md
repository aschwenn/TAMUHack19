# Testing Workbench:

This is where scripts and other files can be tested

## PDF Parsing (pdfMiner/Slate):

Install instructions (if you want to mess around with PDF parsing):
  * Python 2.7 and up ONLY (different setup for Python3)
  1. pip install pdfminer==20110515
  2. pip install slate
  3. Example code to parse some PDF:
  * ```python
    import slate
    with open('grd20181EN.pdf') as f:
        doc = slate.PDF(f)
        print(doc)
    ```
