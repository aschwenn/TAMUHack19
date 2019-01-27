# Testing Workbench:

This is where the main Python script scrapes Texas A&M PDF grade reports. Outputs to a data.csv file and uploads to a mySQL database

## PDF Grade Report Scraping:
   * Built with Python 2.7. Libraries used: Py2PDF, re, csv, os, sys, urllib2, mysql
   1. Make sure you have Python 2.7 installed
   2. The TAMU Grade registrar system url link looks like this:
      ```
      http://web-as.tamu.edu/gradereport/PDFReports/20181/grd20181EN.pdf
      ```
   3. Notice how the year and semester are denoted by the 4 digit year and either 1,2, or 3 to correspond with Spring, Summer, and Fall.
   Also note the 2 letter abbreviation for each department.
   4. Therefore, one can pass in the year and semester of their choice, along with department:
      ```python
      python main.py grd20181EN.pdf
      ```
      * Returns the grade report for Spring 2018 for the ENgineering Department

## PDF Parsing (pdfMiner/Slate):

Install instructions (if you want to mess around with PDF parsing):
  * Python 2.7 and up ONLY (different setup for Python3)
  1. Run this
     ```python
     pip install pdfminer==20110515
     ```
     
  2. Then this
     ```python
     pip install slate
     ```
     
  3. Example code to parse some PDF:
  * ```python
    import slate
    with open('grd20181EN.pdf') as f:
        doc = slate.PDF(f)
        print(doc)
    ```

## PDF Parsing (PyPDF2)
  1. pip install PyPDF2
  2. Example code:
  * ```python
    from PyPDF2 import PdfFileReader

    def parsePDF(path):
        with open(path, 'rb') as f:
            pdf = PdfFileReader(f)
            page = pdf.getPage(0)
            print(page)
            print('Page type : {}'.format(str(type(page))))

            text = page.extractText()
            print(text)

    if __name__ == '__main__':
        path = 'grd20181EN.pdf'
        parsePDF(path)
    ```
### Regex Expression Testing:
   *    ```python
        regexCourse = "/([A-Z]{4}-[0-9]{3}-[0-9]{3})+/" 
        regexGrades = "/(?<![-\.]|[0-9])([0-9]{1,3}(?![-\d]))/"
        regexGPA = "/[0-9]{1}\.[0-9]{3}/"
        regexProfessors = "/(?!\\n)[A-Z\s]+(?=\\n)/"
        regexCleanTotalCourse = "/(COURSE TOTAL:[\s\S]*?(?=[A-Z]|$))|(DEPARTMENT TOTAL:[\s\S]*(?![A-Z]|$))/"
        regexCleanPercentages = "/([0-9]+\.[0-9]+[%]\\n)/"
        regexCleanHeaders = "/^[\s\S]*?(?=[A-Z]{4}-[0-9]{3}-[0-9]{3})/"
        ```